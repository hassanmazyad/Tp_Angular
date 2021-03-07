const { Double } = require('mongodb');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: String,
    nom: String,
    auteur: String,
    matiere: String,
    imgProf: String,
    imgMatiere: String,
    dateDeRendu: Date,
    remarque: String,
    rendu: Boolean,
    note: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
