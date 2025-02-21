import { Spinner } from 'reactstrap';
import {FC} from "react";
import {Ispinner} from "../../Types/UtilityTypes.tsx";

export const Loader: FC<Ispinner> = ({ height, width }: Ispinner) : JSX.Element =>{
    return(
        <div className="Spinner">
            <Spinner style={{ width: width, height: height }} />
        </div>
    );
}

export default Loader;