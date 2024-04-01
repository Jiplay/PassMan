import React from 'react';
// @ts-ignore  Strange but necessary, works in prod mode
import {mongodb} from '../../models';
interface ListItem {
    Website: string;
    Login: string;
    Password: string;
    Additional: string;
}

interface ListViewProps {
    items?: mongodb.Credentials[];
    onItemClick: (Login: number) => void;

}

const ListView: React.FC<ListViewProps> = ({ items, onItemClick }) => {
        const handleItemClick = (id: number) => {
        onItemClick(id);
    };

    return (
        <div style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                 <ul className="list-group">
                     {items?.map((item, index) => (
                    <li key={item.Login} className="list-group-item" onClick={() => handleItemClick(index)}>
                        {item.Website}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListView;
