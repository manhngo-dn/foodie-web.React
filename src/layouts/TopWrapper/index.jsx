import React, { useMemo } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import * as S from "./styles";

const TopWrapper = () => {
  const { breadcrumb } = useSelector((state) => state.commonReducer);

  const renderBreadcrumb = useMemo(() => {
    return breadcrumb.map((item, index) => {
      return (
        <Breadcrumb.Item key={index}>
          {item.path ? (
            <Link to={item.path}>{item.name}</Link>
          ) : (
            <span>{item.name}</span>
          )}
        </Breadcrumb.Item>
      );
    });
  }, [breadcrumb]);

  return (
    <S.Container>
      <S.Content>
        <Breadcrumb>{renderBreadcrumb}</Breadcrumb>
        {!!breadcrumb.length && (
          <h1
            style={{
              margin: 0,
              padding: 0,
              color: "#ee4d2d",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {breadcrumb[breadcrumb.length - 1]?.name}
          </h1>
        )}
      </S.Content>
    </S.Container>
  );
};

export default TopWrapper;
