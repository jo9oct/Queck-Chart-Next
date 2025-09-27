
import { Inngest } from "inngest";
import ConnectDB from "../config/db.js"
import {User} from "../model/User.js"

// Create a client to send and receive events
export const inngest = new Inngest({ id: "QuickCart-Next" });

// inngest function to save data in a data base
export const asyncUserCreation = inngest.createFunction(
    { id: "async-user-form-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
      const {id, first_name, last_name, email_addresses, image_url } = event.data
      const UserData = {
        _id: id,
        name: first_name + " " + last_name,
        email: email_addresses[0].email_address,
        imageUrl: image_url
      }

      await ConnectDB()
      await User.create(UserData)
    },
  );

// inngest function to update data in a data base
export const asyncUserUpdate = inngest.createFunction(
    { id: "update-user-form-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
      const {id, first_name, last_name, email_addresses, image_url } = event.data
      const UserData = {
        _id: id,
        name: first_name + " " + last_name,
        email: email_addresses[0].email_address,
        imageUrl: image_url
      }

      await ConnectDB()
      await User.findByIdAndUpdate(id,UserData)
    },
  );

// inngest function to delete data in a data base
export const asyncUserDelete = inngest.createFunction(
    { id: "delete-user-form-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
      const {id} = event.data
      await ConnectDB()
      await User.findByIdAndDelete(id)
    },
  );