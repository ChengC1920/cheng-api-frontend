import { listInterfaceInfoVOByUserIdPageUsingPOST } from '@/services/nero-api-backend/interfaceInfoController';
import { ShareAltOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Card, Layout, List, message, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import { Content, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import indexStyle from './index.less';

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: '64px',
    paddingInline: '30%',
    lineHeight: '64px',
    color: '#fff',
    background: '#fcfcfc',
};

const tabsCard: React.CSSProperties = {
    textAlign: 'center',
    height: '64px',
    paddingInline: '30%',
    lineHeight: '64px',
    color: '#fff',
    background: '#fcfcfc',
};

const contentStyle: React.CSSProperties = {
    minHeight: 120,
    lineHeight: '120px',
};

const Index: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<API.InterfaceInfoVO[]>([]);
    const loadData = async (searchText = '', current = 1, pageSize = 5) => {
        setLoading(true);
        try {
            await listInterfaceInfoVOByUserIdPageUsingPOST({
                name: searchText,
                current,
                pageSize,
            }).then((res) => {
                console.log(res?.data?.records);
                setList(res?.data?.records ?? []);
            });
        } catch (error: any) {
            message.error('请求失败，' + error.message);
        }
        setLoading(false);
    };
    useEffect(() => {
        loadData();
    }, []);

    const onSearch = (value: string) => {
        loadData(value);
    };

    const CardInfo: React.FC<{
        totalNum: React.ReactNode;
        leftNum: React.ReactNode;
    }> = ({ totalNum, leftNum }) => (
        <div className={indexStyle.cardInfo}>
            <div>
                <p>已调用次数</p>
                <p>{totalNum}</p>
            </div>
            <div>
                <p>剩余调用次数</p>
                <p>{leftNum}</p>
            </div>
        </div>
    );

    return (
        <PageContainer>
            <Layout>
                <Header style={headerStyle}>
                    <Search
                        size={'large'}
                        placeholder="请输入接口名称"
                        onSearch={onSearch}
                        enterButton
                    />
                </Header>
                <Content style={contentStyle}>
                    <List<API.InterfaceInfoVO>
                        className={indexStyle.filterCardList}
                        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                        dataSource={list || []}
                        loading={loading}
                        renderItem={(item) => (
                            <List.Item>
                                <Card
                                    hoverable
                                    bodyStyle={{ paddingBottom: 20 }}
                                    actions={[
                                        <Tooltip title="分享" key="share">
                                            <ShareAltOutlined />
                                        </Tooltip>,
                                        <Tooltip title="在线调用" key="share">
                                            <div
                                                onClick={() => {
                                                    history.push('/interface_info/' + item.id);
                                                }}
                                            >
                                                在线调用
                                            </div>
                                        </Tooltip>,
                                    ]}
                                >
                                    <Card.Meta title={item.name} />
                                    <div>
                                        <CardInfo totalNum={item.totalNum} leftNum={item.leftNum} />
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />

                    {/*<Card style={{width: 300, marginTop: 16}} loading={loading}>*/}
                    {/*    <Meta*/}
                    {/*        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"/>}*/}
                    {/*        title="Card title"*/}
                    {/*        description="This is the description"*/}
                    {/*    />*/}
                    {/*</Card>*/}
                </Content>
            </Layout>
        </PageContainer>
    );
};

export default Index;
