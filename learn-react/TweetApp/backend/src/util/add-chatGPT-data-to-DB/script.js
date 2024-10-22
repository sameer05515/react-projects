const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Category, Question } = require('../../routes/ChatGPTConversation.model'); 

const metadata = {
    dateOfExecution:'23-Oct-2023',
    purpose: `convert 
    1. Raw chatGPT file names to json object and save in DB with empty array of 'smartContent'
    2. Raw ChatGPT conversation objects to a formaated json object and save in DB with empty array of 'smartContent'
    3. Raw ChatGPT message objects to a formaated json object and save in DB with its message.text in first element of array of 'smartContent'
    `,
    steps: `
    Plan of Execution
    1. Take backup of all collections
    2. Save hardcoded chatGPT file names
    2. Fetch all conversations for a chatGPT file
    3. Convert Raw ChatGPT conversation objects to a formaated json object and save in DB with empty array of 'smartContent'
    3.1. Convert Raw ChatGPT message objects to a formaated json object and save in DB with its message.text in first element of array of 'smartContent'
    4. Verify changes
    `,
    postChangeActivities: `
    Make proper UI changes for the above activity
    Raise PR and commit changes
    `
};