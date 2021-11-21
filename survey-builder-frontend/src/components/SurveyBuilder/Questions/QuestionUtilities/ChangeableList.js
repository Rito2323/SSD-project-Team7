/***
 * Will take in a list of strings as input.
 * Will also take in a function from the parent component to update the list in the parent.
 */
 import './ChangeableList.css';

/**
 * 
 * @param props.title string.
 * @param props.addButtonTitle string.
 * @param props.list list of strings.
 * @param listName
 * @param updateList funtion to update list in parent
 * @returns 
 */

function ChangeableList(props) {
    // Create each input tag based on the list.
    var list = [...props.list];
    var rows = [];
    for (var i = 0; i < list.length; i++) {
        var row =
            <tr>
                <td><input
                    id={"val_"+i}
                    value={list[i]}
                    onChange={(e)=>{
                        var index = e.target.id.split('_')[1];
                        list[index] = e.target.value;
                        props.updateList(list);
                    }}/></td>      
                <td><button id={"up_"+i} className="up-button" onClick={(e)=>{
                    var index = e.target.id.split('_')[1];
                    if (index > 0) {
                        var temp = list[index - 1];
                        list[index - 1] = list[index];
                        list[index] = temp;
                        props.updateList(list);
                    }
                }}></button></td>
                <td><button id={"down_"+i} className="down-button" onClick={(e)=>{
                    var index = e.target.id.split('_')[1];
                    if (index < (rows.length - 1)) {
                        var temp = list[index];
                        list[index] = list[Number(index) + 1];
                        list[Number(index) + 1] = temp;
                        props.updateList(list);
                    }
                }}></button></td>
                <td><button id={"delete_"+i} className="del-button " onClick={(e)=>{
                    var index = e.target.id.split('_')[1];
                    if (index <= (rows.length - 1) && index >= 0) {
                        list.splice(index, 1);
                    }
                    props.updateList(list);
                }}></button></td>
            </tr>;
        rows.push(row);
    }

    return (
        <div className="ChangeableList">
            <p className="form-subtitle">{props.title}</p>
            <button onClick={(e)=>{
                list.push("");
                props.updateList(list);
            }}>{props.addButtonTitle}</button>
            {rows}
        </div>
    );
}

export default ChangeableList;