import React from 'react';
// @ts-ignore  Strange but necessary, works in prod mode
import {mongodb} from '../../models';
import { BsDashCircleFill } from "react-icons/bs";


interface ListViewProps {
    items?: mongodb.Credentials[];
    onItemClick: (Login: number) => void;
    onDeleteClick: (website: string) => void;
}

const ListView: React.FC<ListViewProps> = ({ items, onItemClick, onDeleteClick }) => {
        const handleItemClick = (id: number) => {
        onItemClick(id);
    };

    const handleDeleteClick = (website: string) => {
        onDeleteClick(website);
    };

    return (
        <div style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                 <ul className="list-group">
                     {items?.map((item, index) => (
                     <div style={{ display: "flex", alignItems: "center"}}>
                             <li key={index} className="list-group-item" style={{width: "200px", margin: "7px"}}
                                 onClick={() => handleItemClick(index)}>
                                 {item.Website}
                             </li>
                         <div>
                             <li onClick={() => handleDeleteClick(item.Website)}>
                                <BsDashCircleFill style={{float: "right", color: "rgb(69,74,87)", fontSize: "25px"}}></BsDashCircleFill>
                             </li>
                         </div>
                         </div>
                     ))}
                 </ul>
        </div>
    );
};

export default ListView;
