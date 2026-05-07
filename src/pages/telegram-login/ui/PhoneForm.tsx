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
      <h2 className="text-xl font-extrabold text-[#0f1f3d] mb-1.5 text-center">
        Tizimga kirish
      </h2>
      <p className="text-[13px] text-gray-500 mb-6 leading-relaxed text-center">
        Telegram bot orqali bir martalik kod yuboriladi.
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={(v) => onSubmit('+998' + String(v.phone).replace(/\D/g, ''))}
      >
        <Form.Item
          name="phone"
          label={
            <span className="font-semibold text-[13px]">Telefon raqam</span>
          }
          rules={[
            { required: true, message: 'Telefon raqam kiriting' },
            { pattern: /^\d{9}$/, message: '9 ta raqam kiriting (901234567)' },
          ]}
        >
          <Input
            prefix={
              <span className="flex items-center gap-1.5 text-gray-700 font-semibold pr-2 mr-1 border-r border-gray-300">
                <PhoneOutlined style={{ fontSize: 14, color: '#1565c0' }} />
                +998
              </span>
            }
            placeholder="901234567"
            size="large"
            maxLength={9}
            autoComplete="off"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isPending}
          className="font-bold h-11 mt-1"
        >
          Kod yuborish
        </Button>
      </Form>
    </>
  );
}
