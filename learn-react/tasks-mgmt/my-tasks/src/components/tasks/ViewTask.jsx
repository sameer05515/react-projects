import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { Button } from 'react-bootstrap';

function ViewTask({id, itemEditHandler=()=>{}}) {
  const dataList = useSelector((state) => state.data);
  const selectedItem = dataList.find(item => item._id === id);
  const editData= ()=>{
    itemEditHandler(selectedItem);
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>
        [ {format(new Date(selectedItem.date), "dd/MMM/yyyy", { locale: enGB })} ] -
            {selectedItem.title}
          </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
        <div dangerouslySetInnerHTML={{ __html: selectedItem.htmlText }} />
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
        <Card.Footer>
          <Button onClick={editData}>Edit</Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default ViewTask;