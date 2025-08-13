import { CgMenuLeft } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";

export default function TopBar({setMobileMenuOpen}) {
    return(
        <>
        <div className="flex px-2 justify-between items-center w-full font-semibold text-3xl tracking-tighter ">
            <div><CgMenuLeft
                className="text-2xl cursor-pointer md:hidden"
                onClick={()=>setMobileMenuOpen(true)}
                />
            </div>
            <h1>ChatBot</h1>
            <CgProfile className="text-2xl cursor-pointer"/>
        </div>
        </>
    )
}