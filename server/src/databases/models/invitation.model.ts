import mongoose, { Document, Schema, Types } from 'mongoose'
import { USER_DOCUMENT_NAME } from './user.model'

// Collection and Document Names
export const INVITATION_COLLECTION_NAME = 'invitations'
export const INVITATION_DOCUMENT_NAME = 'invitation'

// Invitation Status Enum
export const INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
} as const

// TypeScript Union Type for Status
export type InvitationStatus = keyof typeof INVITATION_STATUS

// Interface for Invitation Document
export interface IInvitation extends Document {
  inviter: Types.ObjectId
  invitee: Types.ObjectId
  board: Types.ObjectId
  status: InvitationStatus
  _destroy?: boolean
  createdAt: Date
  updatedAt: Date
}

// Invitation Schema
const invitationSchema = new Schema<IInvitation>(
  {
    inviter: {
      type: Schema.Types.ObjectId,
      ref: USER_DOCUMENT_NAME,
      required: true
    },

    invitee: {
      type: Schema.Types.ObjectId,
      ref: USER_DOCUMENT_NAME,
      required: true
    },

    board: {
      type: Schema.Types.ObjectId,
      ref: 'board',
      required: true
    },

    status: {
      type: String,
      enum: Object.values(INVITATION_STATUS), // Enum to limit to defined values
      default: INVITATION_STATUS.PENDING,
      required: true
    },

    _destroy: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: INVITATION_COLLECTION_NAME,
    toJSON: { virtuals: true, getters: true }, // Make sure to include virtuals when serializing
    toObject: { virtuals: true } // Include virtual fields when converting to plain objects
  }
)

// Indexing for performance optimization
invitationSchema.index({ invitee: 1 }) // Common index for lookup

// Mongoose Model
export const InvitationModel = mongoose.model<IInvitation>(INVITATION_DOCUMENT_NAME, invitationSchema)
