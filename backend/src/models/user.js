import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		image: {
			type: String, // cloudinary url
			required: true,
		},
		orderHistory: [
			{
				date: {
					type: Date,
					default: Date.now,
				},
				items: [
					{
						name: String,
						price: Number,
						quantity: Number,
						id: {
							type: Schema.Types.ObjectId,
							ref: "Food",
						},
					},
				],
			},
		],
		password: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);


 // Hashing password before saving in database
userSchema.pre('save', function (next) {
	//	Password change nahi hua to kuch nahi karna hai 
	if (!this.isModified('password')) return;

	//	Password change hua to hash kardo
	const user = this;
	bcrypt.hash(user.password, 10, (err, hash) => {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
}); 


const User = mongoose.model("User", userSchema);
export default User;