const fs = require("fs");
const yaml = require("js-yaml");

function escapeName(name) {
    return name.replace(/[.…:<>"*\\/|¡!¿?]/g,"");
}

function generatePaths(infoExercise) {
    infoExercise.old.path = `Proyectos/${infoExercise.infoCap.id}/${infoExercise.old.id}.${infoExercise.old.name}`;
    infoExercise.new.path = `Proyectos/${infoExercise.infoCap.id}/${infoExercise.new.id}.${escapeName(infoExercise.new.name)}`;
}

function updateGuides(infoExercise, guides) {
    let guidesCap = guides.find(cap => cap.name == infoExercise.infoCap.name);
    let guidesExercise = guidesCap.exercises.find(ex => ex.id == infoExercise.old.id);
    if (guidesExercise) {
        console.log(`  Updating guides.json...`)
        guidesExercise.id = infoExercise.new.id;
        guidesExercise.name = infoExercise.new.name;
        guidesExercise.path = infoExercise.new.path;
    }
}

function renameDirectory(infoExercise) {
    try {
        fs.renameSync(infoExercise.old.path, infoExercise.new.path);
        console.log(`  Renaming directory: ${infoExercise.old.path} -> ${infoExercise.new.path}`);
    } catch (e) {
        console.log(`  Directory was not renamed (${e.message.slice(0, 33) + (e.message.length > 33 ? "..." : "")})`)
    }
}

function updateMeta(infoExercise) {
    let metaExerciseRaw = fs.readFileSync(infoExercise.new.path + "/meta.yml");
    let metaExercise = yaml.load(metaExerciseRaw);
    console.log(`  Updating meta.yml...`)
    metaExercise.name = infoExercise.new.name;
    metaExercise.blocks.defaultToolbox = toolbox;
    fs.writeFileSync(infoExercise.new.path + "/meta.yml", yaml.safeDump(metaExercise));
}

function updateDescription(infoExercise) {
    let description;
    try {
        description = fs.readFileSync(infoExercise.new.path + "/description.md").toString();
        console.log(`  Updating description.md...`)
        description = description.replace(/^#\s*Proyecto.*/, `# Proyecto '${infoExercise.new.name}'`);
        description = description.replace(/\n\[PDF\]:.*/g, `\n[PDF]: ${encodeURI(`https://raw.githubusercontent.com/Program-AR/proyectos-gobstones-jr/master/${infoExercise.new.path}/assets/resources/description.pdf`)} "Enunciado de '${infoExercise.new.name}' en PDF"`);
        fs.writeFileSync(infoExercise.new.path + "/description.md", description)
    }
    catch(e) {
        console.log(`  description.md could not be updated (${e.message.slice(0, 33) + (e.message.length > 33 ? "..." : "")})`)
    }
}

function hideDescription(infoExercise) {
    let description;
    try {
        fs.renameSync(infoExercise.new.path + "/description.md", infoExercise.new.path + "/description-hidden.md");
        console.log(`  Renaming description.md -> description-hidden.md`)
    }
    catch (e) {
        console.log(`  description.md could not be hidden`)
    }
}

function unhideDescription(infoExercise) {
    let description;
    try {
        fs.renameSync(infoExercise.new.path + "/description-hidden.md", infoExercise.new.path + "/description.md");
        console.log(`  Renaming description-hidden.md -> description.md`)
    }
    catch (e) {
        console.log(`  description-hidden.md could not be unhidden`)
    }
}

function checkStructure(infoExercise) {
    console.log(`  Checking file structure:`)

    locate = function(name, files, prefix = "") {
        if (files.includes(name)) {
            console.log(`    ✓ ${prefix}${name}`)
            return true;
        }
        else {
            console.log(`    ✗ ${prefix}${name}`);
            return false;
        }
    }
    
    let filesRoot = fs.readdirSync(infoExercise.new.path);
    let expectedFilesRoot = [
        "content.gbk",
        "content.gbs",
        "cover.png",
        "description.md",
        "extra.gbs",
        "meta.yml"
    ];
    expectedFilesRoot.forEach(file => locate(file, filesRoot));
    let extraFiles = filesRoot.filter(file => ! (expectedFilesRoot + ["assets"]).includes(file));

    if (locate("assets", filesRoot)) {
        let filesAssets = fs.readdirSync(infoExercise.new.path + "/assets");
        let expectedFilesAssets = [
            "attires",
            "boards",
            "resources",
            "solutions"
        ];
        expectedFilesAssets.forEach(file => {
            locate(file, filesAssets, "assets/")
        });
    }
    else {
        try {
            fs.mkdirSync(infoExercise.new.path + "/assets");
        } catch(e) {}
    }

    if (extraFiles.length > 0) {
        console.log(`    - Extra files: ${extraFiles.join(', ')}`);

        boards = extraFiles.filter(file => file.startsWith("Board"));
        if (boards.length > 0) {
            try {
                fs.mkdirSync(infoExercise.new.path + "/assets/boards");
            } catch (e) { }
            boards.forEach(boardFile => fs.renameSync(infoExercise.new.path + "/" + boardFile, infoExercise.new.path + "/assets/boards/" + boardFile));
        }

        if (extraFiles.includes("Recursos")) {
            fs.renameSync(infoExercise.new.path + "/Recursos", infoExercise.new.path + "/assets/resources");
        }

        if (extraFiles.includes("Resources")) {
            fs.renameSync(infoExercise.new.path + "/Resources", infoExercise.new.path + "/assets/resources");
        }
    }

}

// Load info-proyectos.yaml
const infoAllRaw = fs.readFileSync("info-proyectos.yaml");
const infoAll = yaml.load(infoAllRaw);

// Load guides.json
const guidesRaw = fs.readFileSync("guides.json");
const guides = JSON.parse(guidesRaw);

// Load toolbox.xml
const toolbox = fs.readFileSync("toolbox.xml").toString();

infoAll.forEach(infoCap => {
    infoCap.exercises.forEach(infoExercise => {
        infoExercise.infoCap = infoCap;
        console.log(`Exercise ${infoExercise.new.id}: ${infoExercise.new.name}`);
        generatePaths(infoExercise);
        // updateGuides(infoExercise, guides);
        // renameDirectory(infoExercise);
        updateMeta(infoExercise);
        // updateDescription(infoExercise);
        // hideDescription(infoExercise);
        // checkStructure(infoExercise);
    });
})

// Save guides.json
fs.writeFileSync("guides.json", JSON.stringify(guides, null, 2));
