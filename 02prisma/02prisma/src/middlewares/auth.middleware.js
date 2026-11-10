export const authmiddleware = async(req, res, next)=>{
    try {
        const authheaders = req.headers.authorization

        if (!authheaders) {
            return res.status(200).json({
                status: false,
                message: "You must token needed"
            })
        }
        const token = authheaders.split("")[1]

    } catch (error) {
        res.status(200).json({
            message: `check the error ${error}`
        })
    }
}