import logo from "@/assets/logo/logo.jpg";
import home1 from "@/assets/home/home1.jpg";
import home2 from "@/assets/home/home2.jpg";
import home3 from "@/assets/home/home3.jpg";
import home4 from "@/assets/home/home4.jpg";
import home5 from "@/assets/home/home5.jpg";
import type {
  AdminAssetOption,
  CmsAssetKey,
  CmsAssetReference,
  CmsImageAsset,
} from "@/lib/cms/types";

const assetLibrary = {
  logo: {
    label: "Organization logo",
    src: logo,
    alt: "KGVSS logo with Gandhian portrait and circular wordmark.",
  },
  "archive-1": {
    label: "Archive 1",
    src: home1,
    alt: "Collage of community gathering, public unveiling moments, and memorial installations.",
  },
  "archive-2": {
    label: "Archive 2",
    src: home2,
    alt: "Collage of portrait busts and completed public landmarks in community settings.",
  },
  "archive-3": {
    label: "Archive 3",
    src: home3,
    alt: "Collage of field walkthroughs, implementation reviews, and completed installation moments.",
  },
  "archive-4": {
    label: "Archive 4",
    src: home4,
    alt: "Collage of landscaped visitor spaces, community grounds, and finished public environments.",
  },
  "archive-5": {
    label: "Archive 5",
    src: home5,
    alt: "Project archive collage combining ceremonies, Gandhi memorial imagery, and field documentation.",
  },
} satisfies Record<
  CmsAssetKey,
  {
    label: string;
    src: typeof logo;
    alt: string;
  }
>;

export function resolveAsset(reference: CmsAssetReference): CmsImageAsset {
  const asset = assetLibrary[reference.assetId];

  return {
    id: reference.assetId,
    src: asset.src,
    alt: reference.alt || asset.alt,
    className: reference.className,
  };
}

export function getAssetCatalog(): AdminAssetOption[] {
  return Object.entries(assetLibrary).map(([id, asset]) => ({
    id: id as CmsAssetKey,
    label: asset.label,
    alt: asset.alt,
    previewSrc: asset.src.src,
    width: asset.src.width,
    height: asset.src.height,
  }));
}

export function getDefaultAssetReference(assetId: CmsAssetKey): CmsAssetReference {
  const asset = assetLibrary[assetId];

  return {
    assetId,
    alt: asset.alt,
  };
}

export function isCmsAssetKey(value: string): value is CmsAssetKey {
  return value in assetLibrary;
}
