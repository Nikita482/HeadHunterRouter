import styles from "./Skills.module.css";
import { PillsInput, Pill, Text, Group, Button } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setTags, removeTag } from "../../store/cartSlice";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Skills = () => {
  // При первой загрузке: если в query нет тегов, но в redux они есть — добавляем их в query
  useEffect(() => {
    const tagsFromQuery = searchParams.getAll("tags");
    if (tags.length > 0 && tagsFromQuery.length === 0) {
      const params = new URLSearchParams(searchParams);
      tags.forEach((tag) => params.append("tags", tag));
      setSearchParams(params);
    }
  }, []);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const tags = useSelector((state: RootState) => state.card.tags);
  const [inputValue, setInputValue] = useState("");

  // Синхронизация тегов из query в redux
  useEffect(() => {
    const tagsFromQuery = searchParams.getAll("tags");
    if (tagsFromQuery.length > 0) {
      if (JSON.stringify(tagsFromQuery) !== JSON.stringify(tags)) {
        tagsFromQuery.forEach((tag) => dispatch(setTags(tag)));
      }
    }
  }, [searchParams, dispatch]);

  // Добавление тега и обновление query
  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    dispatch(setTags(trimmed));
    const params = new URLSearchParams(searchParams);
    params.append("tags", trimmed);
    setSearchParams(params);
    setInputValue("");
  };

  // Удаление тега и обновление query
  const removeTagAndQuery = (tag: string) => {
    dispatch(removeTag(tag));
    const params = new URLSearchParams(searchParams);
    const allTags = params.getAll("tags").filter((t) => t !== tag);
    params.delete("tags");
    allTags.forEach((t) => params.append("tags", t));
    setSearchParams(params);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTag(inputValue);
    }
  };

  return (
    <div className={styles.skills}>
      <Text pt={24} pb={12} className={styles.skills__title}>
        Ключевые навыки
      </Text>

      <Group>
        <PillsInput.Field
          placeholder="Навык"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={onKeyDown}
          className={styles.skills__pole}
        />

        <Button
          onClick={() => addTag(inputValue)}
          className={styles.skills__btn}
        >
          <p>+</p>
        </Button>
      </Group>

      <Pill.Group mt={15} mb={15}>
        {tags.map((tag) => (
          <Pill
            withRemoveButton
            key={tag}
            onRemove={() => removeTagAndQuery(tag)}
          >
            {tag}
          </Pill>
        ))}
      </Pill.Group>
    </div>
  );
};

export default Skills;
