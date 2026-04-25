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
    projectNumber,
    company,
    status,
    projectType,
    description,
    category,
    snapshot {
      role,
      timeline,
      platform,
      stack,
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
            caption,
            image { ..., asset-> }
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
        bg,
        heading,
        headingBody,
        imageBody,
        image { ..., asset-> }
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
    tags,
    "thumbnail": thumbnail.asset->url,
    "thumbnailAlt": thumbnail.alt,
    url
  }
`;
