import {observer} from "mobx-react-lite";
import {Button} from "reactstrap";

function AddField({ handleAddNewInput,disabled }: { handleAddNewInput: Function, disabled?: boolean } ) {
    return <Button onClick={() => handleAddNewInput()} disabled={disabled}> Add Field </Button>;
}

export default observer(AddField);