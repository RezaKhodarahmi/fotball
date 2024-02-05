import React from 'react';
import '../styles/core/index.less';
import { Button, Form, Input, notification } from 'antd';
import { routes } from '../canvas/constants';
import i18next from 'i18next';
import { useNavigate } from 'react-router-dom';


const LoginForm: React.FC<{
  form: any
}> = ({form}) => {
  const navigate = useNavigate();

  const openNotification = () => {
    const args = {
      message: i18next.t('common.failed_login'),
      description: i18next.t('common.wrong_user_pass'),
      duration: 0,
    };
    notification.open(args);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        fetch(routes.API.AUTH.login, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(values)
        }).then((response) => {
          if (response.status == 200) {
            response.json().then(json => {
              localStorage.setItem('token', json.token);
              window.location.href = '/'
            });
          }
          else if (response.status == 403) {
            openNotification();
          }
        });
      }
    });
  }
  const { getFieldDecorator } = form;
  return (
    <div className='login-container'>
      <Form
        className='login-container-form'
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div style={{ height: '160px' }}>
          <div className='login-title'>{i18next.t('common.login-editor')}</div>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: `${i18next.t('common.enter-email')}` }],
            })(
            <Input style={{ minWidth: 350 }} placeholder={i18next.t('common.email')} type='email'/>
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: `${i18next.t('common.enter-password')}` }],
            })(
            <Input.Password style={{ minWidth: 350 }} placeholder={i18next.t('common.password')}/>
            )}
          </Form.Item>
        </div>
        <Button type='primary' block htmlType="submit">
          {i18next.t('common.login')}
        </Button>
        <a href='/register'>{i18next.t('common.register')}</a>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'login_form' })(LoginForm);;