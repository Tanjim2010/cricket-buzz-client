import { useContext } from "react";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { authContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useUserData from "../../Hooks/useUserData";
const Banner = () => {
    const { user } = useContext(authContext);
    const [,refetch] = useUserData();
    const axiosPublic = useAxiosPublic();

    const handleClaimButton = () => {
        if (user && user.email) {
            Swal.fire({
                title: "write your coin amount",
                input: "number",
            }).then(async(result) => {
                if (result.isConfirmed) {
                    const coin = parseInt(result.value);
                    await axiosPublic.put(`/coin/${user.email}`, {coin})
                    .then(res => {
                        toast.success(`${result.value}${res.data.message}`);
                        refetch()
                    })
                }
            });
        }
        else{
            toast.error('Please Login First')
            return null
        }
    }


    return (
        <div style={{
            backgroundImage: "url('https://i.ibb.co.com/1tMxVjzz/bg-shadow.png')"
        }} className="rounded-3xl md:space-y-4 space-y-2 text-center bg-black  text-white px-2 py-16 bg-cover bg-no-repeat md:w-4/5 mx-auto flex flex-col justify-center items-center">
            <div>
                <img src="https://i.ibb.co.com/bjZPjsyT/banner-main.png" className="md:w-[280px] w-[150px]" alt="" />
            </div>
            <h1 className="md:text-[40px] text-2xl font-bold">Assemble Your Ultimate Dream 11 Cricket Team</h1>
            <p className="md:text-2xl font-medium text-[#B8B8B8]">Beyond Boundaries Beyond Limits</p>
            <div className="border-2 border-[#DEF428] p-1 rounded-xl">
                <button onClick={handleClaimButton} className="bg-[#DEF428] px-4 py-2 rounded-xl text-black font-bold">Claim Free Credit</button>
            </div>
        </div>
    );
};

export default Banner;