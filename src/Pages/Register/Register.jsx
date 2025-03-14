import { useContext } from "react";
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Register = () => {
    const { createUser } = useContext(authContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const { name, email, password } = data;
        const userData = {
            email,
            name,
            coin:0,
        }
        createUser(email, password)
            .then(async (res) => {
                console.log(res)
                await axiosPublic.post('/users', userData)
                    .then(res => {
                        console.log(res)
                        toast.success('User registered successfully');
                        navigate('/')
                    })

            })
            .catch(error => {
                toast.error(error.message)
                console.log(error.response.data);
            })
        console.log(name, email, password)
    }
    return (
        <div className='min-h-screen min-w-3xl max-w-3xl flex flex-col mx-auto justify-center'>
            <div className='bg-[#DEF428] p-10 rounded-xl'>
                <h1 className="text-3xl text-center font-bold pb-4">Register Now</h1>
                <form className="fieldset space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="font-medium">Your Name</label>
                        <label className="floating-label">
                            <span>name</span>
                            <input type="text" placeholder="name" name="name" {...register("name", { required: true })} className="input w-full" />
                        </label>
                    </div>
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
                    <button className="btn btn-neutral mt-4">Register</button>
                </form>

                <p className="text-sm font-semibold mt-4">Already have an account? <NavLink className={'hover:text-blue-800 hover:underline'} to={'/login'}>Login</NavLink></p>
            </div>
        </div>
    );
};

export default Register;