import React from "react";
import '../../../../../css/largedevices/usercard.modules.css'
function UserCardComponent() {
    return (
        <>
            <div className="containerDashboard">
                <h1 className="titulliPershkrim">Miresevini!</h1>
                <h2>Te dhenat e tua</h2>
                <p className="usercardp"><strong>ID:</strong> </p>
                <p className="usercardp"><strong>Emri:</strong> </p>
                <p className="usercardp"><strong>Mbiemri:</strong> </p>
                <p className="usercardp"><strong>Username:</strong></p>
                <p className="usercardp"><strong>Email:</strong></p>
                <div className="usercardtest">
                    <a className="usercarda" href=""><button className="buttonusercard">Perditeso te Dhenat</button></a>
                    <a className="usercarda" href=""><button className="buttonusercard">Ndrysho Fjalekalimin</button></a>
                </div>
                <a className="usercarda" href=""><button className="buttonusercard">Terminet e tua</button></a>
            </div>

        </>
    );
}
export default UserCardComponent