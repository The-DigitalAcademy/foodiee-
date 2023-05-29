module.exports = mongoose => {

    const User = mongoose.model(
        "user", mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                email: String,
                cellNumber: Number,
                password: String,
                confirmPassword: String,
                isLoggedIn: Boolean

            }
        )
    );

    return User;
}