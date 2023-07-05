import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {getUserVOByIdUsingGET} from "@/services/nero-api-backend/userController";
import {useModel} from "@@/exports";
import { Card, Col, Row } from 'antd';

const Profile: React.FC = () => {
    const [data, setData] = useState<API.UserVO>({});
    const [loading, setLoading] = useState(true);
    const {initialState} = useModel('@@initialState');
    useEffect(() => {
        try {
            getUserVOByIdUsingGET({
                id: initialState?.loginUser?.id
            }).then((res) => {
                if (res.data) {
                    setData(res.data);
                }
            })
        } catch (e: any) {
            console.log(e)
        }
    }, [])

    return (
        <PageContainer>
            <Row gutter={24}>
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={16}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Profile;
