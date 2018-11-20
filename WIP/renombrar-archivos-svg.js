const fs = require("fs");
const yaml = require("js-yaml");

// Load info-proyectos.yaml
const infoAllRaw = fs.readFileSync("../info-proyectos.yaml");
const infoAll = yaml.load(infoAllRaw);

let filenames = fs.readdirSync(".").filter(filename => filename.endsWith(".svg"));

filenames.forEach(filename => {
    let filenameParts = filename.match(/^(\d\d\db?)(-.*)/);
    if (filenameParts) {
        let projectNumber = filenameParts[1];
        let projectName = infoAll
            .find(cap => cap.id == "Cap."+projectNumber[0])
            .exercises
            .find(exercise => exercise.new.id == projectNumber)
            .new.name
            .replace(/[.…:<>"*\\/|¡!¿?]/g, "");
        console.log("Renaming " + projectNumber + "." + projectName + filenameParts[2]);
        fs.renameSync(filename, "../BloquesSVG/Cap." + projectNumber[0] + "/" + projectNumber + "." + projectName + filenameParts[2]);
    }
})

// console.log(files);
