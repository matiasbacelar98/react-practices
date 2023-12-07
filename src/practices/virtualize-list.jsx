//** BAD 

// Increases DOM size
// Increases the time taken to load the web page
const list = [...]; // 10k items here

const ExpensiveList = () => {
    return list.map(el => <User user={el} />);
}

//** BETTER
import { FixedSizeList as List } from 'react-window';

const list = [...]; // 10k items here

const Row = ({ index, style }) => {
    return(
        <div style={style}>
            <User user={list[index]} />
        </div>
    );    
};

// Only renders a part of the 10k elements (the ones in the viewport)
// Reduces the amount of DOM elements, increasing performance
const ExpensiveList = () => {
    return(
        <List height={150} width={300} itemCount={10000} itemSize={35}>
            {Row}
        </List>
    );
}