import {
    getUserVOByIdUsingGET,
    updateSecretKeyUsingPOST,
    userLoginUsingPOST,
} from '@/services/nero-api-backend/userController';
import { useModel } from '@@/exports';
import {
    CommentOutlined,
    FieldTimeOutlined,
    LockOutlined,
    UnlockOutlined,
    UserOutlined,
    VerifiedOutlined,
} from '@ant-design/icons';
import { PageContainer, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { Avatar, Button, Card, Col, Divider, message, Modal, Row, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const { Paragraph } = Typography;

const avatarStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
};
const buttonStyle: React.CSSProperties = {
    marginLeft: '30px',
};

const Profile: React.FC = () => {
    const [data, setData] = useState<API.UserVO>({});
    const [visible, setVisible] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { initialState } = useModel('@@initialState');
    const formRef = useRef<
        ProFormInstance<{
            userPassword: string;
        }>
    >();

    useEffect(() => {
        try {
            getUserInfo(initialState?.loginUser?.id);
        } catch (e: any) {
            console.log(e);
        }
    }, []);

    // 获取用户信息
    const getUserInfo = async (id: any) => {
        return getUserVOByIdUsingGET({ id }).then((res) => {
            if (res.data) {
                setData(res.data);
            }
        });
    };

    // 显示秘钥
    const showSecretKey = async () => {
        let userPassword = formRef?.current?.getFieldValue('userPassword');

        // 登录
        const res = await userLoginUsingPOST({
            userAccount: data?.userAccount,
            userPassword: userPassword,
        });
        if (res.code === 0) {
            setOpen(false);
            setVisible(true);
            formRef?.current?.resetFields();
        }
    };

    // 重置秘钥
    const resetSecretKey = async () => {
        try {
            let userPassword = formRef?.current?.getFieldValue('userPassword');
            // 登录
            const res = await userLoginUsingPOST({
                userAccount: data?.userAccount,
                userPassword: userPassword,
            });
            if (res.code === 0) {
                const res = await updateSecretKeyUsingPOST({
                    id: data?.id,
                });
                if (res.data) {
                    getUserInfo(data?.id);
                    message.success('重置成功！');
                    setOpen(false);
                }
            }
        } catch (e: any) {
            console.log(e);
        }
    };
    return (
        <PageContainer>
            <Row gutter={24}>
                <Col span={8}>
                    <Card title="个人信息" bordered={false}>
                        <Row>
                            <Col style={avatarStyle}>
                                <Avatar
                                    size={120}
                                    src={<img src={data?.userAvatar} alt="avatar" />}
                                />
                            </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col>
                                <UserOutlined /> 用户名称：{data?.userName}
                            </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col>
                                <CommentOutlined /> 用户账号：{data?.userAccount}
                            </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col>
                                <VerifiedOutlined /> 用户角色：{data?.userRole}
                            </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col>
                                <FieldTimeOutlined /> 注册时间：{data?.createTime}
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card title="秘钥操作" bordered={false}>
                        <Row>
                            <Col>
                                {visible ? (
                                    <Paragraph
                                        copyable={{
                                            text: data?.accessKey,
                                        }}
                                    >
                                        <LockOutlined /> accessKey：{data?.accessKey}
                                    </Paragraph>
                                ) : (
                                    <Paragraph>
                                        <UnlockOutlined /> secretKey：*********
                                    </Paragraph>
                                )}
                            </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col>
                                {visible ? (
                                    <Paragraph
                                        copyable={{
                                            text: data?.secretKey,
                                        }}
                                    >
                                        <UnlockOutlined /> secretKey：{data?.secretKey}
                                    </Paragraph>
                                ) : (
                                    <Paragraph>
                                        <UnlockOutlined /> secretKey：*********
                                    </Paragraph>
                                )}
                            </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col>
                                {!visible ? (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setOpen(true);
                                            setFlag(true);
                                        }}
                                    >
                                        查看秘钥
                                    </Button>
                                ) : (
                                    <Button type="primary" onClick={() => setVisible(false)}>
                                        隐藏秘钥
                                    </Button>
                                )}
                                <Button
                                    style={buttonStyle}
                                    onClick={() => {
                                        setOpen(true);
                                        setFlag(false);
                                    }}
                                    type="primary"
                                    danger
                                >
                                    重置秘钥
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Modal
                title="查看秘钥"
                open={open}
                onOk={flag ? showSecretKey : resetSecretKey}
                onCancel={() => setOpen(false)}
            >
                <ProForm<{
                    userPassword: string;
                }>
                    formRef={formRef}
                    formKey="check-user-password-form"
                    autoFocusFirstInput
                    submitter={{
                        resetButtonProps: {
                            style: {
                                display: 'none',
                            },
                        },
                        submitButtonProps: {
                            style: {
                                display: 'none',
                            },
                        },
                    }}
                >
                    <ProFormText.Password name="userPassword" placeholder="请输入用户密码" />
                </ProForm>
            </Modal>
        </PageContainer>
    );
};

export default Profile;
