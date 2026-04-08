import { groq } from 'next-sanity';

export const HOME_HERO_QUERY = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    hero { headlinePrefix, headlineHighlight, subline }
  }
`;

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    hero { headline, subline, stats },
    story,
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
    slug,
    subtitle,
    tags,
    "image": image.asset->url,
    "imageAlt": image.alt,
    url,
    order
  }
`;

export const SIDE_PROJECTS_QUERY = groq`
  *[_type == "sideProject"] | order(order asc) {
    _id,
    name,
    description,
    tags,
    "thumbnail": thumbnail.asset->url,
    "thumbnailAlt": thumbnail.alt,
    url
  }
`;
