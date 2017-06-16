
var mainCanvas = document.getElementById("mainCanvas");
//var characterCanvas = document.getElementById("characterCanvas");
var mapCanvas = document.getElementById("mapCanvas");

var mainEngine = new BABYLON.Engine(mainCanvas, true);
//var characterEngine = new BABYLON.Engine(characterCanvas, true);
var mapEngine = new BABYLON.Engine(mapCanvas, true);

var mainScene;
var mapScene;

//var characterObject;
//var characterPosition = new BABYLON.Vector3(0, 1, 0);

var characterAmount;
var characterList;
var characterObjects = [];
var characterPositions = [];
var characterObjectsMap = [];

var cameraObject;
var cameraPosition = new BABYLON.Vector3(100, 1000, 0);
var cameraTarget = new BABYLON.Vector3(0, 0, 0);

var buildingObjects = [];
var buildingPositions = [];
var buildingSource = [];

function changeCharacterPosition(newCharacterPosition, index)
{
    var animation = createAnimation(characterPositions[index], newCharacterPosition);
    
    characterObjects[index].animations = [];
    characterObjects[index].animations.push(animation);

    mainScene.beginAnimation(characterObjects[index], 0, 30);

    //pause to wait for the animate
    setTimeout(function ()
    {
        characterObjects[index].position = newCharacterPosition;
        characterObjectsMap[index].position = newCharacterPosition;
        
        characterPositions[index] = newCharacterPosition;
    }, 1000);
}

function changeCameraPosition(newTarget)
{
	var newPosition = new BABYLON.Vector3(newTarget.x + 200, newTarget.y + 180, newTarget.z);
	
    //pause to wait for the animate
    setTimeout(function ()
    {
        cameraObject.setPosition(newPosition);
        cameraPosition = newPosition;

        cameraObject.setTarget(newTarget);
        cameraTarget = newTarget;
    }, 1000);
}

function popMessage(message)
{
    //to stop render the pic
    mainEngine.stopRenderLoop();

    //display and hide the block
    $("#msgOutput").show();
    $("#message").show();
    $("#OKButton").show();

    $("#message").text(message);

    $("#OKButton").click(function ()
    {
        //hide and diaply the block
        $("#msgOutput").hide();
        $("#message").hide();
        $("#OKButton").hide();

        //continue the the render loop
        mainEngine.runRenderLoop(function ()
        {
            mainScene.render();
        });
    });
}

function popMessageWithReturn(message)
{
    //to stop render the pic
    mainEngine.stopRenderLoop();

    //display and hide the block
    $("#msgOutput").show();
    $("#message").show();
    $("#YESButton").show();
    $("#NOButton").show();

    $("#message").text(message);
    
    //if click yes button
    $("#YESButton").click(function ()
    {
        //hide and diaply the block
        $("#msgOutput").hide();
        $("#message").hide();
        $("#YESButton").hide();
        $("#NOButton").hide();

        //continue the the render loop
        mainEngine.runRenderLoop(function ()
        {
            mainScene.render();
        });

        return true;
    });

    //if click no button
    $("#NOButton").click(function ()
    {
        //hide and diaply the block
        $("#msgOutput").hide();
        $("#message").hide();
        $("#YESButton").hide();
        $("#NOButton").hide();

        //continue the the render loop
        mainEngine.runRenderLoop(function ()
        {
            mainScene.render();
        });

        return false;
    });
}

function rollingDice(amount)
{
    mainEngine.stopRenderLoop();

    //show the block
    $("#diceOutput").show();

    //to show different picture
    switch (amount)
    {
        case 1:
            $("#secondDice").show();
            $("#secondDice").css("margin-top", "30%");
            $("#secondDice").css("margin-left", "45%");
            break;
        case 2:
            $("#firstDice, #thirdDice").show();
            $("#firstDice, #thirdDice").css("margin-top", "30%");
            $("#firstDice").css("margin-left", "30%");
            $("#thirdDice").css("margin-left", "110px");
            break;
        case 3:
            $("#firstDice, #secondDice, #thirdDice").show();
            $("#firstDice, #secondDice, #thirdDice").css("margin-top", "30%");
            $("#secondDice, #thirdDice").css("margin-left", "30px");
            $("#firstDice").css("margin-left", "30%");
            break;
    }

    //to store the random value
    var random1;
    var random2;
    var random3; 

    //for change piture loop
    function pictureChanging()
    {
        random1 = Math.floor(Math.random() * 6) + 1;
        random2 = Math.floor(Math.random() * 6) + 1;
        random3 = Math.floor(Math.random() * 6) + 1;

        $("#firstDice").attr("src", "asset/dice/" + random1 + ".png");
        $("#secondDice").attr("src", "asset/dice/" + random2 + ".png");
        $("#thirdDice").attr("src", "asset/dice/" + random3 + ".png");
    }

    //wait for the show function
    setTimeout(function ()
    {
        var inter = setInterval(pictureChanging, 100);

        setTimeout(function () { clearInterval(inter); }, 3000);

    }, 10);

    //hide the block
    setTimeout(function ()
    {
        //hide the block
        $("#diceOutput, #firstDice, #secondDice, #thirdDice").hide();
        
        //continue the the render loop
        mainEngine.runRenderLoop(function ()
        {
            mainScene.render();
        });
        
        switch (amount)
        {
            case 1:
                return random2;
            case 2:
                return random1 + random3;
            case 3:
                return random1 + random2 + random3;
        }

    }, 4000);
}

function initialCharacter(amount, pictures)
{
    characterAmount = amount;
    characterList = pictures;

    //to create characters
    for (var i = 1; i <= amount; i++)
    {
        var character = BABYLON.Mesh.CreatePlane("plane", 20, mainScene);
        var characterMap = BABYLON.Mesh.CreatePlane("plane", 20, mapScene);
        
        character.rotation.x = Math.PI / 2;
        character.rotation.z = Math.PI / 2;
        
        characterMap.rotation.x = Math.PI / 2;
        characterMap.rotation.z = Math.PI / 2;

        //the default position
        character.position = new BABYLON.Vector3(0, 1, 0);
        characterMap.position = new BABYLON.Vector3(0, 1, 0);

        //Creation of a textured material, used by charcter and for maoinScene
        var materialCharatcer = new BABYLON.StandardMaterial("texturePlane", mainScene);
        materialCharatcer.diffuseTexture = new BABYLON.Texture("asset/character/0" + pictures[i - 1] + ".png", mainScene);
        materialCharatcer.diffuseTexture.hasAlpha = true;
        materialCharatcer.backFaceCulling = false;  //Always show the front and the back of an element
        
        //Creation of a textured material, used by charcter and for maoinScene
        var materialCharatcerMap = new BABYLON.StandardMaterial("texturePlane", mapScene);
        materialCharatcerMap.diffuseTexture = new BABYLON.Texture("asset/character/0" + pictures[i - 1] + ".png", mapScene);
        materialCharatcerMap.diffuseTexture.hasAlpha = true;
        materialCharatcerMap.backFaceCulling = false;  //Always show the front and the back of an element

        //plane with its material
        character.material = materialCharatcer;
        characterMap.material = materialCharatcerMap;

        characterObjects[i] = character;
        characterObjectsMap[i] = characterMap;
        
        characterPositions[i] = new BABYLON.Vector3(0, 1, 0);
    }
}

function buildABuilding(str, position, pushOrNot, isBig)
{	
    var buildingManager;
    var building;

    if (isBig)
    {
        buildingManager = new BABYLON.SpriteManager("buildingManager", "asset/buildings/" + str, 1, 100, mainScene);

        building = new BABYLON.Sprite("building", buildingManager);

        building.position = position;
        building.position.y = 12;

        building.size = 25;
        
    }
    else
    {
        buildingManager = new BABYLON.SpriteManager("buildingManager", "asset/buildings/" + str, 1, 50, mainScene);

        building = new BABYLON.Sprite("building", buildingManager);

        building.position = position;
        building.position.y = 5;

        building.size = 10;
    }

    if (pushOrNot == true)
    {
        buildingObjects.push(building);
        buildingPositions.push(position);
        buildingSource.push(str);
    }
}

function deleteABuilding(target)
{
    for (var i = 0; i < buildingObjects.length; i++)
    {
        if (buildingPositions[i].x == target.x && 
            buildingPositions[i].z == target.z)
        {
            buildingObjects[i].dispose();

            buildingObjects.splice(i, 1);
            buildingPositions.splice(i, 1);
            buildingSource.splice(i, 1);
        }
    }
}

function createSkyBox(scene)
{
    var skyBox = BABYLON.Mesh.CreateBox("skyBox", 3000.0, scene);
    //creation  of a material, used by the skybox
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);	//remove all light reflections on the box
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);	//remove all light reflections on the box
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/TropicalSunnyDay", scene);	//directory of 6 face of the box
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    skyBox.material = skyboxMaterial;

    return skyBox;
}

function createCamera(position, target, scene, canvas)
{
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 100, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(position);
    camera.setTarget(target);
    //camera.position = position;
    //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(20, 8, 10), scene)
    camera.attachControl(canvas, true);

    return camera;
}

function createMap(scene)
{
    //Creation of the map
    var plane = BABYLON.Mesh.CreatePlane("plane", 1000, scene);
    plane.rotation.x = Math.PI / 2;
    plane.rotation.z = Math.PI / 2;

    //Creation of a textured material, used by map
    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    materialPlane.diffuseTexture = new BABYLON.Texture("textures/map.png", scene);
    materialPlane.diffuseTexture.hasAlpha = true;
    materialPlane.specularColor = new BABYLON.Color3(0, 0, 0);	//remove all light reflections on the box
    materialPlane.backFaceCulling = false;//Always show the front and the back of an element

    //plane with its material
    plane.material = materialPlane;

    return plane;
}

function createCharacter(scene)
{
    var character = BABYLON.Mesh.CreatePlane("plane", 20, scene);
    character.rotation.x = Math.PI / 2;
    character.rotation.z = Math.PI / 2;

    //the privious position
    character.position = characterPosition;

    //Creation of a textured material, used by charcter
    var materialCharatcer = new BABYLON.StandardMaterial("texturePlane", scene);
    materialCharatcer.diffuseTexture = new BABYLON.Texture("asset/character/01.png", scene);
    materialCharatcer.diffuseTexture.hasAlpha = true;
    materialCharatcer.backFaceCulling = false;  //Always show the front and the back of an element

    //plane with its material
    character.material = materialCharatcer;

    /*
    //prepare animate
    var animation = createAnimation(characterPosition, nextCharacterPosition);
    character.animations = [];
    character.animations.push(animation);

    //start animation
    scene.beginAnimation(character, 0, 30);
    
    //pause to wait for the animate
    setTimeout(function ()
    {
        character.position = nextCharacterPosition;
        characterPosition = nextCharacterPosition;
    }, 1000);
    */
    return character;
}

function createAnimation(originPosition, destination)
{
    var animationBox = new BABYLON.Animation("positionAnimate", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    var xdistance = (destination.x - originPosition.x) / 2;
    var ydistance = (destination.y - originPosition.y) / 2;
    var zdistance = (destination.z - originPosition.z) / 2;

    var keys = [];
    //At the animation key 10, set position

    //At the animation key 0, set origin
    keys.push({
        frame: 0,
        value: originPosition
    });

    //At the animation key 15, set half position
    keys.push({
        frame: 15,
        value: new BABYLON.Vector3(originPosition.x + xdistance,
            originPosition.y + ydistance, originPosition.z + zdistance)
    });

    //At the animation key 30, set destination
    keys.push({
        frame: 20,
        value: destination
    });

    animationBox.setKeys(keys);

    return animationBox;
}

function createMainScene()
{
    var scene = new BABYLON.Scene(mainEngine);
    mainScene = scene;

    scene.clearColor = new BABYLON.Color3(0, 0, 0);		//backgroung color

    //creation of a skybox
    var skybox = createSkyBox(scene);

    //Create an Arc Rotate Camera - aimed negative z this time
    var camera = createCamera(cameraPosition, cameraTarget, scene, mainCanvas);

    //create the light of the scene
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;

    //create map scene
    var plane = createMap(scene);
    
    //var character = createCharacter(scene);
    initialCharacter(characterAmount, characterList);

    //to build the building
    for (var i = 0; i < buildingObjects.length; i++)
    {
        buildABuilding(buildingSource[i], buildingPositions[i], false);
    }

    //characterObject = character;
    cameraObject = camera;

    return scene;
}

/*
function createCharacterScene() 
{
    var scene = new BABYLON.Scene(characterEngine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);		//backgroung color

    //create the light of the scene
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;

    //Create an Arc Rotate Camera - aimed negative z this time
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 200, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(characterCanvas, true);

    //Creation of a plane
    var plane = BABYLON.Mesh.CreatePlane("plane", 120, scene);
    plane.rotation.x = Math.PI / 2;
    plane.rotation.z = Math.PI / 2;

    //Creation of a repeated textured material, used by plane
    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    materialPlane.diffuseTexture = new BABYLON.Texture("textures/map.png", scene);
    materialPlane.diffuseTexture.hasAlpha = true;
    materialPlane.backFaceCulling = false;//Always show the front and the back of an element

    //plane with its material
    plane.material = materialPlane;

    return scene;
}
*/

function createMapScene ()
{
    var scene = new BABYLON.Scene(mapEngine);
    mapScene = scene;

    scene.clearColor = new BABYLON.Color3(0.204, 0.392, 0.796);		//backgroung color

    //create the light of the scene
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 5, 0), scene);
    light.intensity = 0.5;

    //Create an Arc Rotate Camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 1200, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(mapCanvas, true);

    //Creation of the map
    var map = createMap(scene);
    //map.position.x = 50;
    //map.position.z = 50;
    
    //Creation of a square
    var square = BABYLON.Mesh.CreatePlane("plane", 100, scene);
    square.rotation.x = Math.PI / 2;
    square.rotation.y = Math.PI;
    square.position.y = 1;

    //Creation of a repeated textured material
    var materialSquare = new BABYLON.StandardMaterial("texturePlane", scene);
    materialSquare.diffuseTexture = new BABYLON.Texture("asset/mapSquare.png", scene);
	materialSquare.specularColor = new BABYLON.Color3(0, 0, 0);	//remove all light reflections on the box
    materialSquare.diffuseTexture.hasAlpha = true;

    square.material = materialSquare;

    //check for keydown to change the camera
    scene.onPointerDown = function (evt, pickResult)
    {
        // if the click hits the ground object, we change the impact position
        // and change the camera target of the main scene
        if (pickResult.hit)
        {
            square.position.x = pickResult.pickedPoint.x;
            square.position.z = pickResult.pickedPoint.z;
			
            changeCameraPosition(square.position);
        }
    }

    return scene;
}

function render()
{
    mainScene = createMainScene();
    //var charcterScene = createCharacterScene();
    mapScene = createMapScene();

    mainEngine.runRenderLoop(function ()
    {
        mainScene.render();
    });

    /*
    characterEngine.runRenderLoop(function () 
    {
        charcterScene.render();
    });
    */

    mapEngine.runRenderLoop(function () 
    {
        mapScene.render();
    });
    
    // Resize
    window.addEventListener("resize", function ()
    {
        mainEngine.resize();
        //characterEngine.resize();
        mapEngine.resize();
    });
}
