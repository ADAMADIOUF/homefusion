import mongoose from "mongoose"

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://media.discordapp.net/attachments/1168684192784208024/1198157634575028274/adama5863_give_me_a_avatar_image_for_my_real_state_user_profile_e08e5739-bf31-442c-9dca-e06c527de350.png?ex=65bde240&is=65ab6d40&hm=aa4aa79399c79aea5f3f5f30e53fdfea6e0d96e874f562eecffa0ee7bc59672c&=&format=webp&quality=lossless&width=645&height=645',
    },
  },
  {
    timestamps: true,
  }
)

const Agent = mongoose.model('Agent', agentSchema)

export default Agent
