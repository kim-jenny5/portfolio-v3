import { groq } from 'next-sanity';

export const HOME_HERO_QUERY = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    hero { headline, subline }
  }
`;

export const WORK_PROJECT_QUERY = groq`
  *[_type == "selectedProject" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    tags,
    "image": image.asset->url,
    "imageAlt": image.alt,
    order,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    projectNumber,
    company,
    status,
    "projectType": coalesce(projectType, snapshot.projectType),
    description,
    category,
    snapshot {
      role,
      timeline,
      projectType,
      links[] { label, url }
    },
    content[] {
      ...,
      _type == 'contentSection' => {
        _type,
        _key,
        title,
        content[] {
          ...,
          _type == 'inlineImage' => {
            _type,
            _key,
            size,
            displaySize,
            caption,
            image { alt, hotspot, asset-> },
            images[] { alt, hotspot, asset-> }
          },
          _type == 'newsletterPreview' => {
            _type,
            _key,
            brands[] {
              _key,
              name,
              "fileUrl": file.asset->url
            }
          }
        }
      },
      _type == 'imageBlock' => {
        _type,
        _key,
        layout,
        size,
        accent,
        textAlign,
        heading,
        headingBody,
        imageBody,
        image { ..., asset-> },
        images[] { ..., asset-> }
      },
      _type == 'videoBlock' => {
        _type,
        _key,
        "videoUrl": video.asset->url,
        size,
        textAlign,
        heading,
        headingBody,
        caption,
        hasAudio,
        accent
      },
      _type == 'marquee' => {
        _type,
        _key,
        label,
        accent,
        images[] { alt, "url": asset->url }
      },
      _type == 'newsletterPreview' => {
        _type,
        _key,
        brands[] {
          _key,
          name,
          "fileUrl": file.asset->url
        }
      }
    }
  }
`;

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    hero { headline, subline, stats },
    profileImage,
    storyHeading,
    story,
    skillsHeading,
    skills[] { name, tags }
  }
`;

// Homepage — card fields only, no project page data
export const homePageQuery = groq`
    *[_type == "homePage"][0] {
      hero { headline, subline },
      selectedProjects {
        sectionTitle,
        projects[]-> {
          _id,
          title,
          description,
          tags,
          coverImage
        }
      }
    }
  `;

// Full project page — used later when building /work/[slug]
export const projectPageQuery = groq`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      tags,
      coverImage,
      projectNumber,
      category,
      subtitle,
      coverImage,
      overview { timeline, tools, deliverables, links },
      sections[] { title, body }
    }
  `;

export const projectSlugQuery = groq`
    *[_type == "project" && defined(slug.current)] {
      "slug": slug.current
    }
  `;

export const SELECTED_PROJECTS_QUERY = groq`
  *[_type == "selectedProject"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    tags,
    "image": image.asset->url,
    "imageAlt": image.alt,
    order
  }
`;

export const ALL_PROJECTS_NAV_QUERY = groq`
  *[_type == "selectedProject"] | order(projectNumber asc) {
    "slug": slug.current,
    title,
    projectNumber
  }
`;

export const SIDE_PROJECTS_QUERY = groq`
  *[_type == "sideProject"] | order(publishedAt desc) {
    _id,
    name,
    description,
    "thumbnail": thumbnail.asset->url,
    "thumbnailAlt": thumbnail.alt,
    links[] { label, url }
  }
`;
