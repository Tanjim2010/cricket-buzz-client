import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { HiMiniUser } from "react-icons/hi2";
import { authContext } from "../../../Provider/AuthProvider";
import useUserData from "../../Hooks/useUserData";
import { toast } from 'react-toastify';
import { MdOutlineDelete } from "react-icons/md";
import Swal from 'sweetalert2'


const AvailablePlayer = () => {
    const [users, refetch] = useUserData();
    const { user } = useContext(authContext)
    const axiosPublic = useAxiosPublic();
    const [selectedTab, setSelectedTab] = useState("available");
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);



    useEffect(() => {
        if (selectedTab === "available") {
            try {
                axiosPublic.get('/players')
                    .then(res => {
                        console.log(res.data);
                        setPlayers(res.data)
                    })
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            setPlayers([])
        }
    }, [axiosPublic, selectedTab])

    useEffect(() => {
        if (selectedTab === 'selected') {
            axiosPublic.get(`/selected/${user?.email}`)
                .then(res => {
                    console.log(res.data);
                    setSelectedPlayers(res.data)
                })
        }
        else {
            setSelectedPlayers([])
        }
    }, [axiosPublic, selectedTab])


    const handleChoseBtn = (player) => {
        if (users.coin >= player.biddingPrice) {
            const selectedData = {
                email: user.email,
                name: users.name,
                playerName: player.name,
                playerPrice: player.biddingPrice,
                playerBattingType: player.battingType,
                playerImage: player.image,
                player_id: player._id
            }
            axiosPublic.post('/selected', selectedData)
                .then(() => {
                    toast.success('your request was successful');
                    refetch();
                })
        }
        else {
            toast.error('You do not have enough coin');
        }
    }

    const handleDeleteBtn = (_id) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete you selected",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/selected/${_id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your selected player has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }


    console.log(players)
    return (
        <div className='py-20 md:w-4/5 mx-auto'>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <h1 className="text-2xl text-center font-bold">Available Players</h1>
                <div className="flex border rounded-full overflow-hidden w-fit ">
                    <button
                        className={`px-4 cursor-pointer py-2 font-semibold transition-all duration-300 ${selectedTab === "available" ? "bg-[#DEF428] text-black" : "bg-white text-gray-500"}`}
                        onClick={() => setSelectedTab("available")}
                    >
                        Available
                    </button>
                    <button
                        disabled={!user}
                        className={`px-4 py-2 cursor-pointer ${!user && 'cursor-none'} font-semibold transition-all duration-300  ${selectedTab === "selected" ? "bg-[#DEF428] text-black" : "bg-white text-gray-500"}`}
                        onClick={() => setSelectedTab("selected")}
                    >
                        Selected (0)
                    </button>
                </div>
            </div>
            {
                selectedTab === "available" ? <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {
                        players.map(player => <div key={player._id} className="bg-white rounded-lg border border-[#bcbaba] p-6">
                            <img src={player.image} className="w-full h-[240px] rounded-lg mb-4 object-cover" alt="" />
                            <div>
                                <h3 className="font-bold pb-3 flex items-center gap-2"><HiMiniUser /> {player.name}</h3>
                                <div className="flex justify-between items-center text-[#686868]">
                                    <h4>{player.country}</h4>
                                    <button className="btn btn-sm text-sm text-[#686868]">{player.role}</button>
                                </div>
                                <div className="border w-full border-[#c7c7c7] my-3"></div>
                                <h4 className="flex justify-between items-center text-sm py-1 text-[#686868]">Batting Type <p>{player.battingType}</p></h4>
                                <div className="flex justify-between items-center">
                                    <h1 className="text-sm text-[#686868]">Price:{player.biddingPrice}</h1>
                                    <button onClick={() => handleChoseBtn(player)} className="btn btn-sm text-sm text-[#686868]">Choose Player</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div> : <div className="flex justify-center flex-col items-center">
                    {
                        selectedPlayers.length > 0 ? <div className="flex flex-col w-full items-center gap-5 py-5">
                            {
                                selectedPlayers.map(selected => <div className="w-full p-3 border border-[#E8E8E8] rounded-2xl  flex justify-between items-center" key={selected._id}>
                                    <div className="flex items-center gap-4">
                                        <img src={selected.playerImage} className="w-[70px] h-[70px] rounded-2xl" alt="" />
                                        <div>
                                            <h4 className="text-lg">{selected.playerName}</h4>
                                            <h4 className="text-sm ">{selected.playerBattingType}</h4>
                                        </div>
                                    </div>
                                    <div className="btn btn-lg btn-ghost" onClick={() => handleDeleteBtn(selected._id)}>
                                        <MdOutlineDelete className="text-red-400" />
                                    </div>
                                </div>)
                            }
                        </div> : <img className="w-[300px] pt-10" src="https://i.ibb.co.com/jkmSpSnC/Screenshot-2025-03-13-144137-removebg-preview.png" alt="" />
                    }
                </div>
            }
        </div>
    );
};

export default AvailablePlayer;