import cn from "classnames";
import Image from "gatsby-image";
import React from "react";

import { IBlogPostData } from "../../templates/blog-post";

import { siteLinks } from "../../data";

import Markdown from "../markdown";
import Meta from "../meta";
import PseudoButton from "../pseudo-button";
import Share from "../share";

import { ReactComponent as ArrowSVG } from "./arrow.svg";
import styles from "./styles.module.css";

function Post({ html, timeToRead, frontmatter, fields }: IBlogPostData) {
  const {
    title,
    date,
    picture,
    description,
    descriptionLong,
    tags,
    author: {
      childMarkdownRemark: {
        frontmatter: { name, avatar }
      }
    }
  } = frontmatter;

  return (
    <div className={styles.wrapper}>
      <Share
        className={cn(styles.share)}
        text={description}
        slug={fields.slug}
      />
      <div className={styles.head}>
        <div className={styles.headContent}>
          <div className={styles.back}>
            <PseudoButton href={siteLinks.blog} type="secondary">
              <ArrowSVG className={styles.arrow} />
              Blog
            </PseudoButton>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.description}>
            {descriptionLong || description}
          </div>
          <Meta
            name={name}
            avatar={avatar}
            date={date}
            timeToRead={timeToRead}
          />
        </div>
      </div>
      {picture && (
        <div className={styles.pictureWrapper}>
          <Image
            fluid={picture.childImageSharp.fluid}
            className={styles.picture}
          />
        </div>
      )}
      <div className={styles.content}>
        <Markdown html={html} />
      </div>
      {tags && (
        <div className={styles.tags}>
          {tags.map(tag => (
            <div className={styles.tag} key={tag}>
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
