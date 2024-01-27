import { useContext } from "react"
import { AuthContext } from "../context"
import { CardProfilePhoto } from "../components/profile/CardProfilePhoto"
import { CardProfileInfo } from "../components/profile/CardProfileInfo";


export const Profile = () => {

    const { authState } = useContext(AuthContext);

    return (
        <div className="container d-flex" id="profileViewClient">
            <CardProfilePhoto 
                authName={authState.userName || ''} 
                authImg={authState.userPhoto || ''}
                authDesc={"Some quick example text to build on the card title and make up the bulk of the card's content."}    
            />
            <CardProfileInfo 
                userName={authState.userName}
                userEmail={authState.userEmail}
                userPhone={authState.userPhone}
                userAge={ 29 }
            />
        </div>
    )
}
