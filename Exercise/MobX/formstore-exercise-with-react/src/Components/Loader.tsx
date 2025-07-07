import { Spinner } from 'reactstrap';
import {FC, JSX} from "react";

interface ISpinner{
    height:number,
    width : number
}

export const Loader: FC<ISpinner> = ({ height, width }: ISpinner) : JSX.Element =>{
    return(
        <div className="Spinner">
            <Spinner style={{ width: width, height: height }} />
        </div>
    );
}

export default Loader;