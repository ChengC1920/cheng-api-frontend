import {
    getInterfaceInfoVOByIdUsingGET,
    invokeInterfaceInfoUsingPOST,
} from '@/services/nero-api-backend/interfaceInfoController';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { Badge, Button, Card, Descriptions, Divider, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [invokeLoading, setInvokeLoading] = useState(false);
    const [data, setData] = useState<API.InterfaceInfoVO>();
    const params = useParams();
    const [invokeRes, setInvokeRes] = useState<any>();

    const loadData = async () => {
        setLoading(true);
        try {
            await getInterfaceInfoVOByIdUsingGET({
                id: Number(params.id),
            }).then((res) => {
                setData(res.data);
            });
        } catch (error: any) {
            message.error('请求失败，' + error.message);
        }
        setLoading(false);
    };
    useEffect(() => {
        loadData();
    }, []);

    const onFinish = async (values: any) => {
        if (!params.id) {
            message.error('接口不存在');
            return;
        }
        setInvokeLoading(true);
        console.log('data', data);
        try {
            await invokeInterfaceInfoUsingPOST({
                id: params.id,
                host: data?.host,
                ...values,
            }).then((res) => {
                setInvokeRes(res.data);
            });
            message.success('接口请求成功');
        } catch (error: any) {
            message.error('接口请求失败');
        }
        setInvokeLoading(false);
    };

    return (
        <PageContainer>
            <Card>
                {data ? (
                    <Descriptions title={data.name} column={1} extra={<Button>调用</Button>}>
                        <Descriptions.Item label="接口状态">
                            {data.status ? (
                                <Badge status="success" text={'开启'} />
                            ) : (
                                <Badge status="default" text={'关闭'} />
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
                        <Descriptions.Item label="主机名">{data.host}</Descriptions.Item>
                        <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
                        <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
                        <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
                        <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
                        <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
                        <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
                    </Descriptions>
                ) : (
                    <>接口不存在</>
                )}
            </Card>
            <Divider />
            <Card title={'在线测试'}>
                <Form name="invoke" layout={'vertical'} onFinish={onFinish}>
                    <Form.Item label={'请求参数'} name={'userRequestParams'}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            调用
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Divider />
            <Card title={'返回结果'} loading={invokeLoading}>
                {invokeRes}
            </Card>
        </PageContainer>
    );
};

export default Index;
