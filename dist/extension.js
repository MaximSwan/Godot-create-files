"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
var crypto = __toESM(require("crypto"));
var path = __toESM(require("path"));

// src/nodes-list.ts
var nodes = [
  "Node",
  "Node3D",
  "Node2D",
  "AcceptDialog",
  "AnimatableBody2D",
  "AnimatableBody3D",
  "AnimatedSprite2D",
  "AnimatedSprite3D",
  "AnimationMixer",
  "AnimationPlayer",
  "AnimationTree",
  "Area2D",
  "Area3D",
  "AspectRatioContainer",
  "AudioListener2D",
  "AudioListener3D",
  "AudioStreamPlayer",
  "AudioStreamPlayer2D",
  "AudioStreamPlayer3D",
  "BackBufferCopy",
  "BaseButton",
  "Bone2D",
  "BoneAttachment3D",
  "BoxContainer",
  "Button",
  "Camera2D",
  "Camera3D",
  "CanvasGroup",
  "CanvasItem",
  "CanvasLayer",
  "CanvasModulate",
  "CenterContainer",
  "CharacterBody2D",
  "CharacterBody3D",
  "CheckBox",
  "CheckButton",
  "CodeEdit",
  "CollisionObject2D",
  "CollisionObject3D",
  "CollisionPolygon2D",
  "CollisionPolygon3D",
  "CollisionShape2D",
  "CollisionShape3D",
  "ColorPicker",
  "ColorPickerButton",
  "ColorRect",
  "ConeTwistJoint3D",
  "ConfirmationDialog",
  "Container",
  "Control",
  "CPUParticles2D",
  "CPUParticles3D",
  "CSGBox3D",
  "CSGCombiner3D",
  "CSGCylinder3D",
  "CSGMesh3D",
  "CSGPolygon3D",
  "CSGPrimitive3D",
  "CSGShape3D",
  "CSGSphere3D",
  "CSGTorus3D",
  "DampedSpringJoint2D",
  "Decal",
  "DirectionalLight2D",
  "DirectionalLight3D",
  "EditorCommandPalette",
  "EditorFileDialog",
  "EditorFileSystem",
  "EditorInspector",
  "EditorPlugin",
  "EditorProperty",
  "EditorResourcePicker",
  "EditorResourcePreview",
  "EditorScriptPicker",
  "EditorSpinSlider",
  "EditorToaster",
  "FileDialog",
  "FileSystemDock",
  "FlowContainer",
  "FogVolume",
  "Generic6DOFJoint3D",
  "GeometryInstance3D",
  "GPUParticles2D",
  "GPUParticles3D",
  "GPUParticlesAttractor3D",
  "GPUParticlesAttractorBox3D",
  "GPUParticlesAttractorSphere3D",
  "GPUParticlesAttractorVectorField3D",
  "GPUParticlesCollision3D",
  "GPUParticlesCollisionBox3D",
  "GPUParticlesCollisionHeightField3D",
  "GPUParticlesCollisionSDF3D",
  "GPUParticlesCollisionSphere3D",
  "GraphEdit",
  "GraphElement",
  "GraphFrame",
  "GraphNode",
  "GridContainer",
  "GridMap",
  "GridMapEditorPlugin",
  "GrooveJoint2D",
  "HBoxContainer",
  "HFlowContainer",
  "HingeJoint3D",
  "HScrollBar",
  "HSeparator",
  "HSlider",
  "HSplitContainer",
  "HTTPRequest",
  "ImporterMeshInstance3D",
  "InstancePlaceholder",
  "ItemList",
  "Joint2D",
  "Joint3D",
  "Label",
  "Label3D",
  "Light2D",
  "Light3D",
  "LightmapGI",
  "LightmapProbe",
  "LightOccluder2D",
  "Line2D",
  "LineEdit",
  "LinkButton",
  "LookAtModifier3D",
  "MarginContainer",
  "Marker2D",
  "Marker3D",
  "MenuBar",
  "MenuButton",
  "MeshInstance2D",
  "MeshInstance3D",
  "MissingNode",
  "MultiMeshInstance2D",
  "MultiMeshInstance3D",
  "MultiplayerSpawner",
  "MultiplayerSynchronizer",
  "NavigationAgent2D",
  "NavigationAgent3D",
  "NavigationLink2D",
  "NavigationLink3D",
  "NavigationObstacle2D",
  "NavigationObstacle3D",
  "NavigationRegion2D",
  "NavigationRegion3D",
  "NinePatchRect",
  "Node2D",
  "Node3D",
  "OccluderInstance3D",
  "OmniLight3D",
  "OpenXRBindingModifierEditor",
  "OpenXRCompositionLayer",
  "OpenXRCompositionLayerCylinder",
  "OpenXRCompositionLayerEquirect",
  "OpenXRCompositionLayerQuad",
  "OpenXRHand",
  "OpenXRInteractionProfileEditor",
  "OpenXRInteractionProfileEditorBase",
  "OpenXRVisibilityMask",
  "OptionButton",
  "Panel",
  "PanelContainer",
  "Parallax2D",
  "ParallaxBackground",
  "ParallaxLayer",
  "Path2D",
  "Path3D",
  "PathFollow2D",
  "PathFollow3D",
  "PhysicalBone2D",
  "PhysicalBone3D",
  "PhysicalBoneSimulator3D",
  "PhysicsBody2D",
  "PhysicsBody3D",
  "PinJoint2D",
  "PinJoint3D",
  "PointLight2D",
  "Polygon2D",
  "Popup",
  "PopupMenu",
  "PopupPanel",
  "ProgressBar",
  "Range",
  "RayCast2D",
  "RayCast3D",
  "ReferenceRect",
  "ReflectionProbe",
  "RemoteTransform2D",
  "RemoteTransform3D",
  "ResourcePreloader",
  "RetargetModifier3D",
  "RichTextLabel",
  "RigidBody2D",
  "RigidBody3D",
  "RootMotionView",
  "ScriptCreateDialog",
  "ScriptEditor",
  "ScriptEditorBase",
  "ScrollBar",
  "ScrollContainer",
  "Separator",
  "ShaderGlobalsOverride",
  "ShapeCast2D",
  "ShapeCast3D",
  "Skeleton2D",
  "Skeleton3D",
  "SkeletonIK3D",
  "SkeletonModifier3D",
  "Slider",
  "SliderJoint3D",
  "SoftBody3D",
  "SpinBox",
  "SplitContainer",
  "SpotLight3D",
  "SpringArm3D",
  "SpringBoneCollision3D",
  "SpringBoneCollisionCapsule3D",
  "SpringBoneCollisionPlane3D",
  "SpringBoneCollisionSphere3D",
  "SpringBoneSimulator3D",
  "Sprite2D",
  "Sprite3D",
  "SpriteBase3D",
  "StaticBody2D",
  "StaticBody3D",
  "StatusIndicator",
  "SubViewport",
  "SubViewportContainer",
  "TabBar",
  "TabContainer",
  "TextEdit",
  "TextureButton",
  "TextureProgressBar",
  "TextureRect",
  "TileMap",
  "TileMapLayer",
  "Timer",
  "TouchScreenButton",
  "Tree",
  "VBoxContainer",
  "VehicleBody3D",
  "VehicleWheel3D",
  "VFlowContainer",
  "VideoStreamPlayer",
  "Viewport",
  "VisibleOnScreenEnabler2D",
  "VisibleOnScreenEnabler3D",
  "VisibleOnScreenNotifier2D",
  "VisibleOnScreenNotifier3D",
  "VisualInstance3D",
  "VoxelGI",
  "VScrollBar",
  "VSeparator",
  "VSlider",
  "VSplitContainer",
  "Window",
  "WorldEnvironment",
  "XRAnchor3D",
  "XRBodyModifier3D",
  "XRCamera3D",
  "XRController3D",
  "XRFaceModifier3D",
  "XRHandModifier3D",
  "XRNode3D",
  "XROrigin3D"
];

// src/extension.ts
function activate(context) {
  const createGodotFile = vscode.commands.registerCommand("gd-creation.createGodotFile", async (uri) => {
    const folderPath = uri.fsPath;
    const input = await vscode.window.showInputBox({
      prompt: "Enter the name of the new Godot script file (without .gd)",
      value: "NewScript",
      validateInput: (value) => {
        if (!value.trim()) return "Filename cannot be empty";
        if (/[\/:*?"<>|]/.test(value)) return "Invalid characters in filename";
        return null;
      }
    });
    if (!input) return;
    const fileName = input.endsWith(".gd") ? input : `${input}.gd`;
    const selectedBase = await vscode.window.showQuickPick(nodes, {
      title: "Select base class (extends)",
      placeHolder: "Node3D"
    });
    const chosenBase = selectedBase || "Node3D";
    const gdFilePath = path.join(folderPath, fileName);
    const uidFilePath = `${gdFilePath}.uid`;
    const gdFileUri = vscode.Uri.file(gdFilePath);
    const uidFileUri = vscode.Uri.file(uidFilePath);
    const uid = generateUid();
    try {
      const gdContent = `extends ${chosenBase}
`;
      await vscode.workspace.fs.writeFile(gdFileUri, new TextEncoder().encode(gdContent));
      const uidContent = `uid://${uid}`;
      await vscode.workspace.fs.writeFile(uidFileUri, new TextEncoder().encode(uidContent));
      vscode.window.showInformationMessage(`Created: ${fileName} with extends ${chosenBase}`);
    } catch (err) {
      vscode.window.showErrorMessage(`Error creating files: ${err}`);
    }
  });
  context.subscriptions.push(createGodotFile);
  const attachScript = vscode.commands.registerCommand("gd-creation.attachScriptToScene", async (uri) => {
    const files = await vscode.workspace.findFiles("**/*.gd", "**/node_modules/**", 200);
    if (files.length === 0) {
      vscode.window.showWarningMessage(".gd scripts not found");
      return;
    }
    const selected = await vscode.window.showQuickPick(
      files.map((f) => ({
        label: vscode.workspace.asRelativePath(f),
        description: f.fsPath,
        uri: f
      })),
      {
        title: "Select script to attach"
      }
    );
    if (!selected) return;
    const document = await vscode.workspace.openTextDocument(uri);
    const text = document.getText();
    const lines = text.split("\n");
    const nodeNames = [];
    let currentNode = null;
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
      if (currentNode && line.includes("script = ExtResource")) {
        hasScript = true;
      }
    }
    if (currentNode && !hasScript) nodeNames.push(currentNode);
    if (nodeNames.length === 0) {
      vscode.window.showWarningMessage("No nodes without attached scripts found.");
      return;
    }
    const nodeName = await vscode.window.showQuickPick(nodeNames, {
      title: "Select node to attach script to"
    });
    if (!nodeName) return;
    const relativeScriptPath = vscode.workspace.asRelativePath(selected.uri).replace(/\\/g, "/");
    const uid = generateUid();
    const extResId = `1_${uid.slice(0, 5)}`;
    const extResourceLine = `[ext_resource type="Script" uid="uid://${uid}" path="res://${relativeScriptPath}" id="${extResId}"]`;
    const scriptAssignmentLine = `script = ExtResource("${extResId}")`;
    if (text.includes(`path="res://${relativeScriptPath}"`)) {
      vscode.window.showWarningMessage("This script is already attached.");
      return;
    }
    const extInsertIndex = lines.findIndex((line) => line.startsWith("[ext_resource")) + 1 || 1;
    lines.splice(extInsertIndex, 0, extResourceLine);
    const nodeHeader = `[node name="${nodeName}"`;
    const nodeLineIndex = lines.findIndex((line) => line.trim().startsWith(nodeHeader));
    if (nodeLineIndex === -1) {
      vscode.window.showErrorMessage(`Node named "${nodeName}" not found in scene.`);
      return;
    }
    let insertIndex = nodeLineIndex + 1;
    while (insertIndex < lines.length && !lines[insertIndex].startsWith("[")) {
      insertIndex++;
    }
    const previousLine = lines[insertIndex - 1];
    if (previousLine.trim() !== "") {
      lines.splice(insertIndex, 0, scriptAssignmentLine);
    } else {
      lines[insertIndex - 1] = scriptAssignmentLine;
    }
    const updatedText = lines.join("\n");
    const edit = new vscode.WorkspaceEdit();
    const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
    edit.replace(uri, fullRange, updatedText);
    await vscode.workspace.applyEdit(edit);
    await document.save();
    vscode.window.showInformationMessage(`Script successfully attached to node "${nodeName}".`);
  });
  context.subscriptions.push(attachScript);
  const createGodotScene = vscode.commands.registerCommand("gd-creation.createGodotScene", async (uri) => {
    const folderPath = uri.fsPath;
    const input = await vscode.window.showInputBox({
      prompt: "Enter the name of the new scene (without .tscn)",
      value: "NewScene",
      validateInput: (value) => {
        if (!value.trim()) return "Scene name cannot be empty";
        if (/[\/:*?"<>|]/.test(value)) return "Invalid characters in scene name";
        return null;
      }
    });
    if (!input) return;
    const fileName = input.endsWith(".tscn") ? input : `${input}.tscn`;
    const selectedBase = await vscode.window.showQuickPick(nodes, {
      title: "Select root node type",
      placeHolder: "Node3D"
    });
    const chosenBase = selectedBase || "Node3D";
    const uid = generateUid();
    const sceneContent = `[gd_scene format=3 uid="uid://${uid}"]

[node name="${input}" type="${chosenBase}"]
`;
    const sceneFilePath = path.join(folderPath, fileName);
    const sceneUri = vscode.Uri.file(sceneFilePath);
    try {
      await vscode.workspace.fs.writeFile(sceneUri, new TextEncoder().encode(sceneContent));
      vscode.window.showInformationMessage(`Scene created: ${fileName} with root node ${chosenBase}`);
    } catch (err) {
      vscode.window.showErrorMessage(`Error creating scene: ${err}`);
    }
  });
  context.subscriptions.push(createGodotScene);
  const detachScript = vscode.commands.registerCommand("gd-creation.detachScriptFromScene", async (uri) => {
    try {
      const document = await vscode.workspace.openTextDocument(uri);
      const text = document.getText();
      const lines = text.split("\n");
      const nodeScriptMap = [];
      let currentNodeName = "";
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const nodeMatch = line.match(/^\[node name=\"([^\"]+)\"/);
        if (nodeMatch) currentNodeName = nodeMatch[1];
        const scriptMatch = line.match(/script = ExtResource\(\"([^\"]+)\"\)/);
        if (scriptMatch && currentNodeName) {
          nodeScriptMap.push({
            nodeName: currentNodeName,
            scriptLineIndex: i,
            extResourceId: scriptMatch[1]
          });
        }
      }
      if (nodeScriptMap.length === 0) {
        vscode.window.showInformationMessage("No scripts found for detachment.");
        return;
      }
      const selected = await vscode.window.showQuickPick(
        nodeScriptMap.map((s) => ({ label: s.nodeName, description: s.extResourceId })),
        { title: "Select node to detach script from" }
      );
      if (!selected) return;
      const target = nodeScriptMap.find((s) => s.nodeName === selected.label);
      if (!target) return;
      lines.splice(target.scriptLineIndex, 1);
      const extIndex = lines.findIndex((line) => line.includes(`id="${target.extResourceId}"`));
      if (extIndex !== -1) lines.splice(extIndex, 1);
      const updatedText = lines.join("\n");
      const edit = new vscode.WorkspaceEdit();
      const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
      edit.replace(uri, fullRange, updatedText);
      await vscode.workspace.applyEdit(edit);
      await document.save();
      vscode.window.showInformationMessage(`Script detached from node "${target.nodeName}".`);
    } catch (err) {
      vscode.window.showErrorMessage(`Error detaching script: ${err}`);
    }
  });
  context.subscriptions.push(detachScript);
}
function deactivate() {
}
function generateUid() {
  return crypto.randomBytes(9).toString("base64url");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
