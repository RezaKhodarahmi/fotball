import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import Icon from '../components/icon/Icon';
import '../styles/core/index.less';
import { useNavigate } from 'react-router-dom';
import { routes } from '../canvas/constants';
import i18next from 'i18next';
import { API_URL } from '../canvas/constants/routes';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<[]>();

  useEffect(()=> {
    getEditors();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('login');
  }

  const getEditors = () => {
    fetch(routes.API.CANVAS.list, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
      method: 'GET',
    }).then((response) => {
      if (response.status === 403) navigate('login');
      response.json().then(json => setData(json))
    })
  }

  const deleteEditor = (id) => {
    fetch(routes.API.CANVAS.delete.replace(':id', id), {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 403) navigate('login');
      else getEditors();
    })
  }

  return (
    <>
    <div className='header'>
      <div style={{
        cursor: 'pointer'
      }} onClick={logout}>{i18next.t('common.logout')}</div>
      <Button 
        onClick={() => navigate('editor')}>{i18next.t('common.add_editor')}
      </Button>
      <div className='title-header'><img src='./morabi_icon.png'/></div>
    </div>
    <div className='main-container'>
      <Row gutter={50}>
        {data && data.map(item =>
          <Col lg={8} sm={24} style={{ marginBottom: '1rem' }}>
            <div className='editor-item'>
              <img
                className='editor-image-item'
                onClick={() => navigate({
                  pathname: '/editor',
                  search: `?e=${item.id}`,
                })}
                src={`${API_URL}/uploads/${item.imageUrl}`}
              />
              <span className='editor-name'>{item.name}</span>
              <Icon onClick={() => deleteEditor(item.id)} className='editor-delete' name="trash" />
            </div>
          </Col>
        )}
      </Row>
      {(!data || data?.length === 0) && <div className='no-item-dashboard'>{i18next.t('common.no_item_dashboard')}</div>}
    </div>
    </>
   
  );
};

export default Home;