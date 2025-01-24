import { Spinner } from 'reactstrap';

const LoadingComponent = ({ height, width }: {height:number, width : number}) =>{
    return(
        <div className="Spinner">
            <Spinner style={{ width: width, height: height }} />
        </div>
    );
}

export default LoadingComponent;