import React from "react";
import { Card } from "@mantine/core";
import styles from "./cardItem.module.css";

export interface CardItemProps {
  item: any;
  children?: React.ReactNode;
}

const CardItem: React.FC<CardItemProps> = ({ item, children }) => {
  const classMap: Record<string, string> = {
    Офис: styles.cardsList__office,
    Гибрид: styles.cardsList__hybrid,
    "Можно удалённо": styles.cardsList__remote,
  };

  const formatMap: Record<string, string> = {
    ON_SITE: "Офис",
    REMOTE: "Можно удалённо",
    HYBRID: "Гибрид",
  };

  return (
    <Card
      key={item.id}
      className={styles.card}
      shadow="sm"
      padding="lg"
      radius="md"
      mb={16}
      withBorder
    >
      <h3 className={styles.cardsList__title}>
        {item.name || "Название вакансии не указано"}
      </h3>

      <div className={styles.cardsList__salaryExperience}>
        <p>
          {item.salary
            ? [
                item.salary.from && `${item.salary.from.toLocaleString()}`,
                item.salary.to && `- ${item.salary.to.toLocaleString()}`,
                item.salary.currency,
              ]
                .filter(Boolean)
                .join(" ")
            : "Зарплата не указана"}
        </p>

        <p className={styles.cardsList__experience}>
          {item.experience.name || "Опыт не указан"}
        </p>
      </div>

      <p className={styles.cardsList__companyName}>
        {item.employer.name || "Компания не указана"}
      </p>

      <div className={styles.cardsList__workFormat}>
        {item.work_format?.length
          ? item.work_format.map(
              (f: { id: string; name: string }, i: number) => {
                const name = formatMap[f.id] || f.name;
                return (
                  <React.Fragment key={f.id}>
                    <span className={classMap[name] || ""}>{name}</span>
                    {i < item.work_format.length - 1 && " / "}
                  </React.Fragment>
                );
              }
            )
          : "Формат не указан"}
      </div>

      <p>{item.address?.city || "Город не указан"}</p>

      <div className={styles.cardsList__btns}>{children}</div>
    </Card>
  );
};

export default CardItem;
