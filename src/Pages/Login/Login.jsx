import { useContext } from "react";
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../../Provider/AuthProvider";

const Login = () => {
    const {logInUser} = useContext(authContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const { email, password } = data;
        logInUser(email, password)
            .then(async (res) => {
                await console.log(res.data);
                toast.success('User login successfully');
                navigate('/')
            })
            .catch(error => {
                toast.error(error.message)
                console.log(error.response.data);
            })
        console.log(email, password)
    }
    return (
        <div className='min-h-screen min-w-3xl max-w-3xl flex flex-col mx-auto justify-center'>
            <div className='bg-[#DEF428] p-10 rounded-xl'>
                <h1 className="text-3xl text-center font-bold pb-4">Login Now</h1>
                <form className="fieldset space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="font-medium">Your Email</label>
                        <label className="floating-label">
                            <span>Email</span>
                            <input type="email" placeholder="email" name="email" {...register("email", { required: true })} className="input w-full" />
                        </label>
                    </div>
                    <div>
                        <label className="font-medium">Your Password</label>
                        <label className="floating-label">
                            <span>Password</span>
                            <input type="text" placeholder="password" name="password" {...register("password", { required: true })} className="input w-full" />
                        </label>
                    </div>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <button className="btn btn-neutral mt-4">Login</button>
                </form>

                <p className="text-sm font-semibold mt-4">Already haven't an account? <NavLink className={'hover:text-blue-800 hover:underline'} to={'/register'}>Register</NavLink></p>
            </div>
        </div>
    );
};

export default Login;