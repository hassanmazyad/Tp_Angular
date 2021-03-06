const { Double } = require('mongodb');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    nom: String,
    auteur: String,
    matiere: String,
    imgProf: String,
    imgMatiere: String,
    dateDeRendu: Date,
    remarque: String,
    rendu: Boolean,
    Note: Double
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
