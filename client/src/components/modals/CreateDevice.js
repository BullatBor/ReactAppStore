import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { Context } from '../..'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';

export const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([])//массив характеристик

    const addInfo = () => {
        setInfo([...info, {title:'', description: '', number: Date.now()}])
    }//функция для добавление характеристик

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }//функция для удаления характеристик
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))//если совпадает номер то возправщаем объект и заменяем по ключу номер
    }

    const addDevice = () => {
        const formData = new FormData();//в передаем через формдату
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))//В FormData используется строка или блоп, поэтому превращаем в строку и на сервера парсится
        createDevice(formData).then(data => onHide());
    }
    const selectFile = e => {
       setFile(e.target.files[0]);
    }

    useEffect(() => {
        fetchTypes().then(
          data => device.setTypes(data.types)
          )
        fetchBrands().then( 
          data =>  device.setBrands(data)
          )
      }, [])//единожды при открытии Shop
  return (
    <Modal
        show={show}
        onHide={onHide}
        centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {device.types.map(type => 
                            <Dropdown.Item 
                                onClick={() => device.setSelectedType(type)} 
                                key={type.id}
                            >
                                {type.name}
                                </Dropdown.Item>
                        )}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {device.brands.map(brand => 
                            <Dropdown.Item 
                                onClick={() => device.setSelectedBrand(brand)} 
                                key={brand.id}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )}
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
            className='mt-3'
                value={name} 
                placeholder={"Введите название устройства"}
                onChange={e => setName(e.target.value)}
            />
            <Form.Control
            className='mt-3'
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                placeholder={"Введите стоимость устройства"}
                type="number"
            />
            <Form.Control
            className='mt-3'
                type="file"
                onChange={selectFile}
            />
            <hr/>
            <Button
                variant={"outline-dark"}
                onClick={addInfo}
            >
                Добавить новое свойство
            </Button>
            {info.map(i =>
                <Row className="mt-4" key={i.number}>
                    <Col md={4}>
                        <Form.Control
                            value={i.title}
                            onChange={(e) => changeInfo('title', e.target.value, i.number)}
                            placeholder='Введите название свойства'
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Control
                                 value={i.description}
                                 onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                placeholder='Введите описание свойства'
                            />
                    </Col>
                    <Col>
                        <Button
                        onClick={() => removeInfo(i.number)}
                        variant={"outline-danger"}
                        >
                            Удалить
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
        <Button variant={"outline-success"} onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
})
