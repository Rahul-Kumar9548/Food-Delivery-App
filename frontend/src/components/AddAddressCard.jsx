import React, { useState, useRef } from 'react'
import axios from '../utils/axios'
import Spinner from './Spinner/Spinner';

const AddAddressCard = ({ setAddAddress }) => {
    const [spinning, setSpinning] = useState("");
    const name = useRef();
    const address = useRef();
    const landmark = useRef();
    const contact = useRef();
    const [alert, setAlert] = useState({
		error: "",
		success: "",
		info: "",
		warning: "",
    });
    
    async function addressHandler() {
        setSpinning(true);
        try {
            const {data} = axios.post("profile/add-address", {
                name: name.current.value,
                location: address.current.value,
                landmark: landmark.current.value,
                contact: contact.current.value,
            })
            console.log(data);
            setAddAddress(false)
            setAlert({ ...alert, success: data });
            setSpinning(false);
        } catch (error) {
            console.log(error);
            setSpinning(false);
            setAlert({ ...alert, error: error });
        }
    }

	return (
		<>
			<div className="absolute p-4 top-[5rem] w-[21rem] left-[1.5rem] md:w-[30rem]  md:left-[25%] lg:left-[35%] h-[30rem] bg-white rounded-xl border-2 z-10 transition-all duration-300 ease-in-out ">
				<div className="flex justify-end gap-[2rem] md:gap-[6rem]">
					<div className="text-2xl">Add New Address</div>
					<img
						src="https://cdn-icons-png.flaticon.com/128/399/399274.png"
						className="w-[20px] h-[20px] cursor-pointer hover:scale-110 transition-all duration-300 active:translate-y-1"
						alt=""
						onClick={() => setAddAddress(false)}
					/>
				</div>
				<div className="p-4 space-y-2">
					<div className="form__group flex field mx-auto">
						<input
							type="input"
							className="form__field"
							placeholder="name"
							required
							ref={name}
						/>

						<label htmlFor="name" className="form__label">
							Name
						</label>
					</div>
					<div className="form__group flex field mx-auto">
						<input
							type="input"
							className="form__field"
							placeholder="address"
							required
							ref={address}
						/>

						<label htmlFor="address" className="form__label">
							Address
						</label>
					</div>
					<div className="form__group flex field mx-auto">
						<input
							type="input"
							className="form__field"
							placeholder="landmark"
							required
							ref={landmark}
						/>

						<label htmlFor="landmark" className="form__label">
							Landmark
						</label>
					</div>
					<div className="form__group flex field mx-auto">
						<input
							type="input"
							className="form__field"
							placeholder="contact"
							required
							ref={contact}
						/>

						<label htmlFor="contact" className="form__label">
							Contact
						</label>
					</div>
					<div className="w-full flex justify-center p-6">
						{spinning ? (
							<Spinner className="w-[30px] h-[30px]" />
						) : (
							<button
								className="cursor-pointer transition-all bg-green-500 text-white px-6 py-2 rounded-lg border-green-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
								onClick={() => addressHandler()}
							>
								Submit
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AddAddressCard