import * as vscode from 'vscode';
import * as crypto from 'crypto';
import * as path from 'path';
import { nodes } from './nodes-list';

export function activate(context: vscode.ExtensionContext) {
  // === Создание Godot-файла ===
  const createGodotFile = vscode.commands.registerCommand('gd-creation.createGodotFile', async (uri: vscode.Uri) => {
    const folderPath = uri.fsPath;

    const input = await vscode.window.showInputBox({
      prompt: 'Введите имя нового Godot-файла (без .gd)',
      value: 'NewScript',
      validateInput: (value) => {
        if (!value.trim()) return 'Имя файла не может быть пустым';
        if (/[\\/:*?"<>|]/.test(value)) return 'Недопустимые символы в имени файла';
        return null;
      },
    });

    if (!input) return;

    const fileName = input.endsWith('.gd') ? input : `${input}.gd`;

    const selectedBase = await vscode.window.showQuickPick(nodes, {
      title: 'Выберите базовый класс (extends)',
      placeHolder: 'Node3D',
    });

    const chosenBase = selectedBase || 'Node3D';

    const gdFilePath = path.join(folderPath, fileName);
    const uidFilePath = `${gdFilePath}.uid`;

    const gdFileUri = vscode.Uri.file(gdFilePath);
    const uidFileUri = vscode.Uri.file(uidFilePath);

    const uid = generateUid();

    try {
      const gdContent = `extends ${chosenBase}\n`;
      await vscode.workspace.fs.writeFile(gdFileUri, new TextEncoder().encode(gdContent));

      const uidContent = `uid://${uid}`;
      await vscode.workspace.fs.writeFile(uidFileUri, new TextEncoder().encode(uidContent));

      vscode.window.showInformationMessage(`Создано: ${fileName} с extends ${chosenBase}`);
    } catch (err) {
      vscode.window.showErrorMessage(`Ошибка при создании файлов: ${err}`);
    }
  });

  context.subscriptions.push(createGodotFile);

  // === Прикрепление скрипта ===
  const attachScript = vscode.commands.registerCommand('gd-creation.attachScriptToScene', async (uri: vscode.Uri) => {
    const files = await vscode.workspace.findFiles('**/*.gd', '**/node_modules/**', 200);
    if (files.length === 0) {
      vscode.window.showWarningMessage('Скрипты .gd не найдены');
      return;
    }

    const selected = await vscode.window.showQuickPick(
      files.map((f) => ({
        label: vscode.workspace.asRelativePath(f),
        description: f.fsPath,
        uri: f,
      })),
      {
        title: 'Выберите скрипт для прикрепления',
      },
    );

    if (!selected) return;

    const document = await vscode.workspace.openTextDocument(uri);
    const text = document.getText();
    const lines = text.split('\n');

    // Сканируем все узлы с name="..." у которых НЕТ script = ExtResource(...)
    const nodeNames: string[] = [];
    let currentNode: string | null = null;
    let hasScript = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^\[node name=\"([^\"]+)\"/);
      if (match) {
        if (currentNode && !hasScript) nodeNames.push(currentNode);
        currentNode = match[1];
        hasScript = false;
        continue;
      }
      if (currentNode && line.includes('script = ExtResource')) {
        hasScript = true;
      }
    }
    if (currentNode && !hasScript) nodeNames.push(currentNode);

    if (nodeNames.length === 0) {
      vscode.window.showWarningMessage('Нет узлов без привязанных скриптов.');
      return;
    }

    const nodeName = await vscode.window.showQuickPick(nodeNames, {
      title: 'Выберите узел, к которому прикрепить скрипт',
    });

    if (!nodeName) return;

    const relativeScriptPath = vscode.workspace.asRelativePath(selected.uri).replace(/\\/g, '/');
    const uid = generateUid();
    const extResId = `1_${uid.slice(0, 5)}`;

    const extResourceLine = `[ext_resource type=\"Script\" uid=\"uid://${uid}\" path=\"res://${relativeScriptPath}\" id=\"${extResId}\"]`;
    const scriptAssignmentLine = `script = ExtResource(\"${extResId}\")`;

    if (text.includes(`path=\"res://${relativeScriptPath}\"`)) {
      vscode.window.showWarningMessage('Этот скрипт уже подключён.');
      return;
    }

    const extInsertIndex = lines.findIndex((line) => line.startsWith('[ext_resource')) + 1 || 1;
    lines.splice(extInsertIndex, 0, extResourceLine);

    const nodeHeader = `[node name=\"${nodeName}\"`;
    const nodeLineIndex = lines.findIndex((line) => line.trim().startsWith(nodeHeader));
    if (nodeLineIndex === -1) {
      vscode.window.showErrorMessage(`Узел с именем \"${nodeName}\" не найден в сцене.`);
      return;
    }

    let insertIndex = nodeLineIndex + 1;
    while (insertIndex < lines.length && !lines[insertIndex].startsWith('[')) {
      insertIndex++;
    }

    const previousLine = lines[insertIndex - 1];
    if (previousLine.trim() !== '') {
      lines.splice(insertIndex, 0, scriptAssignmentLine);
    } else {
      lines[insertIndex - 1] = scriptAssignmentLine;
    }

    const updatedText = lines.join('\n');
    const edit = new vscode.WorkspaceEdit();
    const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
    edit.replace(uri, fullRange, updatedText);
    await vscode.workspace.applyEdit(edit);
    await document.save();

    vscode.window.showInformationMessage(`Скрипт успешно прикреплён к узлу \"${nodeName}\".`);
  });

  context.subscriptions.push(attachScript);
  // === Создание Godot-сцены ===
  const createGodotScene = vscode.commands.registerCommand('gd-creation.createGodotScene', async (uri: vscode.Uri) => {
    const folderPath = uri.fsPath;

    const input = await vscode.window.showInputBox({
      prompt: 'Введите имя новой сцены (без .tscn)',
      value: 'NewScene',
      validateInput: (value) => {
        if (!value.trim()) return 'Имя сцены не может быть пустым';
        if (/[\\/:*?"<>|]/.test(value)) return 'Недопустимые символы в имени сцены';
        return null;
      },
    });

    if (!input) return;

    const fileName = input.endsWith('.tscn') ? input : `${input}.tscn`;

    const selectedBase = await vscode.window.showQuickPick(nodes, {
      title: 'Выберите тип корневого узла',
      placeHolder: 'Node3D',
    });

    const chosenBase = selectedBase || 'Node3D';
    const uid = generateUid();

    const sceneContent = `[gd_scene format=3 uid="uid://${uid}"]\n\n[node name="${input}" type="${chosenBase}"]\n`;
    const sceneFilePath = path.join(folderPath, fileName);
    const sceneUri = vscode.Uri.file(sceneFilePath);

    try {
      await vscode.workspace.fs.writeFile(sceneUri, new TextEncoder().encode(sceneContent));
      vscode.window.showInformationMessage(`Сцена создана: ${fileName} с корневым узлом ${chosenBase}`);
    } catch (err) {
      vscode.window.showErrorMessage(`Ошибка при создании сцены: ${err}`);
    }
  });
  // === Открепление скрипта ===
  const detachScript = vscode.commands.registerCommand('gd-creation.detachScriptFromScene', async (uri: vscode.Uri) => {
    try {
      const document = await vscode.workspace.openTextDocument(uri);
      const text = document.getText();
      const lines = text.split('\n');

      const nodeScriptMap: { nodeName: string; scriptLineIndex: number; extResourceId: string }[] = [];
      let currentNodeName = '';

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const nodeMatch = line.match(/^\[node name=\"([^\"]+)\"/);
        if (nodeMatch) currentNodeName = nodeMatch[1];

        const scriptMatch = line.match(/script = ExtResource\(\"([^\"]+)\"\)/);
        if (scriptMatch && currentNodeName) {
          nodeScriptMap.push({
            nodeName: currentNodeName,
            scriptLineIndex: i,
            extResourceId: scriptMatch[1],
          });
        }
      }

      if (nodeScriptMap.length === 0) {
        vscode.window.showInformationMessage('Скрипты для открепления не найдены.');
        return;
      }

      const selected = await vscode.window.showQuickPick(
        nodeScriptMap.map((s) => ({ label: s.nodeName, description: s.extResourceId })),
        { title: 'Выберите узел для открепления скрипта' },
      );

      if (!selected) return;

      const target = nodeScriptMap.find((s) => s.nodeName === selected.label);
      if (!target) return;

      lines.splice(target.scriptLineIndex, 1);
      const extIndex = lines.findIndex((line) => line.includes(`id=\"${target.extResourceId}\"`));
      if (extIndex !== -1) lines.splice(extIndex, 1);

      const updatedText = lines.join('\n');
      const edit = new vscode.WorkspaceEdit();
      const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
      edit.replace(uri, fullRange, updatedText);
      await vscode.workspace.applyEdit(edit);
      await document.save();

      vscode.window.showInformationMessage(`Скрипт откреплён от узла \"${target.nodeName}\".`);
    } catch (err) {
      vscode.window.showErrorMessage(`Ошибка при откреплении скрипта: ${err}`);
    }
  });

  context.subscriptions.push(detachScript);
}

export function deactivate() {}

function generateUid(): string {
  return crypto.randomBytes(9).toString('base64url');
}

