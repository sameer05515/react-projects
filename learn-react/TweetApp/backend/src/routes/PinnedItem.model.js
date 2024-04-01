const mongoose = require('mongoose');

const pinnedItemSchema = new mongoose.Schema({
    uniqueId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
      validate: {
        validator: function(v) {
          return v.trim().length > 0;
        },
        message: 'uniqueId cannot be an empty string or a string that trims to zero length'
      }
    },
    linkedUniqueId: { 
        type: String,
        default: '',
        validate: {
          validator: function(v) {
            return v.trim().length > 0;
          },
          message: 'linkedUniqueId cannot be an empty string or a string that trims to zero length'
        }
    },
    
    linkedItemType: {
        type: String,
        enum: ['topic', 'task', 'tweet', 'word'], 
        required: true,
    },

    softDelete:{type: Boolean, default:false},
    
    createdDate: {
      type: Date,
      default: Date.now,
    },
    updatedDate: {
      type: Date,
      default: Date.now,
    }
  });

  module.exports = mongoose.model('PinnedItem', pinnedItemSchema);