import { Button, Form, Input } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

interface Props {
  onSubmit: (phone: string) => void;
  isPending: boolean;
}

export default function PhoneForm({ onSubmit, isPending }: Props) {
  const [form] = Form.useForm<{ phone: string }>();

  return (
    <>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f1f3d', marginBottom: 6, textAlign: 'center' }}>
        Tizimga kirish
      </h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 24, lineHeight: 1.6, textAlign: 'center' }}>
        Telegram bot orqali bir martalik kod yuboriladi.
      </p>

      <Form
        form={form}
        layout='vertical'
        onFinish={(v) => onSubmit('+998' + String(v.phone).replace(/\D/g, ''))}
      >
        <Form.Item
          name='phone'
          label={<span style={{ fontWeight: 600, fontSize: 13 }}>Telefon raqam</span>}
          rules={[
            { required: true, message: 'Telefon raqam kiriting' },
            { pattern: /^\d{9}$/, message: '9 ta raqam kiriting (901234567)' },
          ]}
        >
          <Input
            addonBefore={
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#374151', fontWeight: 600 }}>
                <PhoneOutlined style={{ fontSize: 14, color: '#1565c0' }} />
                +998
              </span>
            }
            placeholder='901234567'
            size='large'
            maxLength={9}
            style={{ borderRadius: 10 }}
            autoComplete='off'
          />
        </Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          block
          size='large'
          loading={isPending}
          style={{ borderRadius: 10, background: '#1565c0', border: 'none', fontWeight: 700, height: 44, marginTop: 4 }}
        >
          Kod yuborish
        </Button>
      </Form>
    </>
  );
}
