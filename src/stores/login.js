import { defineStore } from 'pinia'
import { request } from '../utils'

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

export const useLoginStore = defineStore('login', () => {

  async function log(mail, password) {

    const payload = {
      mail: mail.value,
      userpwd: password.value
    }

    const res = await request('TryToLog', payload) //payload è oggetto json

    return res
  }

  async function editPermissions(mail, role) {

    const payload = {
      mail: mail.value,
      role: role.value
    }

    const res = await request('updatePermissions', payload) //payload è oggetto json

    return res
  }

  async function addNewUser(mail, name, surname, role, psw) {
    
    const payload = {
      mail: mail.value,
      name: name.value,
      surname: surname.value,
      role: role.value,
      password: psw.value
    }

    const res = await request('insertNewUser', payload)

    return res
  }

  async function fetchAllUsers() {

    const res = await request('returnAllUsers', {}) //payload è oggetto json 

    return res
  }

  async function updatePassword(mail, psw) {

    const payload = {
      mail: mail.value,
      password: psw.value
    }

    const res = await request('ChangePassword', payload)

    return res;
  }

  async function fetchEvents(eDBId) {
    const payload = {
      eDBId: eDBId
    }
    const res = await request('recuperaDatiEventi', payload) //payload è oggetto json

    return res
  }

  async function deleteUser(mailToDelete) {

    const res = await request('DeleteUser', { "mail" : mailToDelete.value})
    
    return res;
  }

  //metodo per la clonazione dell'openDay 
  async function transmitOpendayData(idTemplate, idFolderOpenday, date, currentTurn, startTime, prenotazioni, db, pres) {

    const payload = {
      idTemplatePrenotazioni : idTemplate.value,
      idFolderOpenDay : idFolderOpenday.value,
      data: date.value,
      turno: currentTurn.value,
      oraInizio: startTime.value,
      nrPren: prenotazioni.value,
      db : db.value,
      isPresente: pres.value
    }

    const res = await request('cloneOpen', payload) //payload è oggetto json

    return res
  }

  //metodo per la clonazione del ministage
  async function transmitMinistageData(idTemplate, idFolder, date, nrProg, maxPren, db) {

    const payload = {
      idTemplatePrenotazioni: idTemplate.value,
      idFolderMini: idFolder.value,
      data: date.value,
      prog: nrProg.value, //numero progressivo minstage
      nrMaxPren: maxPren.value,  //array [nrIA, nrBI, nrAB]
      db : db.value
    }

    const res = await request('cloneMini', payload)

    return res
  }
  
  //metodo per la clonazione del summerStage
  async function transmitSummerStageData(idTemplate, idFolderSummerStage, maxPren, date, progressive, db) {

    const payload = {
      idTemplatePrenotazioni: idTemplate.value,
      idFolderSummer: idFolderSummerStage.value,
      nrMaxPren:maxPren.value,  //array [nrMaxLabInfo, nrMaxLabAuto, nrMaxLabBio]
      date: date.value,  //array ['giovedì 13 giugno', ...]
      prog: progressive.value, 
      db : db.value
    }

    const res = await request('cloneSummer', payload)

    return res
  }

  async function cloneTemplateAiutanti(idTemplatePrenotazioni, idFolderOpenday, data, nrMaxPartecipanti, roles, db) {

    const payload = {
      idTemplatePrenotazioni: idTemplatePrenotazioni.value,
      idFolderOpenDay: idFolderOpenday.value,
      data: data.value,
      nrMaxPartecipanti: nrMaxPartecipanti.value,
      ruoli : roles.value,
      db : db.value
    }

    const res = await request('cloneTemplateHelpersOpen', payload)

    return res;
  }

  async function cloneTemplateAiutantiMiniStage(idTemplate, idFolder, date, db) {
    
    const payload = {
      idTemplatePrenotazioni: idTemplate.value,
      idFolderMini: idFolder.value,
      data: date.value,
      db : db.value
    }

    const res = await request('cloneTemplateHelpersMini', payload)

    return res;
  }

  async function recuperoDatiCartelle() {
    return await request('returnNameId', {})
  }

  async function recuperoProgFromID(id) {

    const payload = {
      selectedID: id.value
    }

    return await request('getProgressivo', payload)
  }

  async function inizializzazioneCartelle() {
    return await request('onCreation', {})
  }

  async function recuperaDate(id) {  
    const payload = {
      dbOpenDayId: id
    }  
    return await request('getAllDates', payload);;
  }

  async function datiNuovoImpegno(nome, descrizione, dataInizio, dataFine)  
  {
    const payload = {
      nome: nome,
      descrizione: descrizione,
      dataInizio: dataInizio,
      dataFine: dataFine
    }

    return await request('creaImpegno', payload);
  }

  async function upLoadImpegno(nome, descrizione, dataInizio, dataFine, rowIndex)  
  {
    const payload = {
      nome: nome,
      descrizione: descrizione,
      dataInizio: dataInizio,
      dataFine: dataFine,
      rowIndex: rowIndex
    }

    return await request('upLoadImpegni', payload);
  }

  return { log, deleteUser, fetchAllUsers, editPermissions, fetchEvents, transmitOpendayData, transmitMinistageData, transmitSummerStageData, recuperoDatiCartelle, addNewUser, updatePassword, inizializzazioneCartelle, cloneTemplateAiutanti, recuperoProgFromID, cloneTemplateAiutantiMiniStage, recuperaDate, datiNuovoImpegno, upLoadImpegno }
}) 
