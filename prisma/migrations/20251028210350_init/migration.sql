-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subject" TEXT NOT NULL DEFAULT '',
    "setting" TEXT NOT NULL DEFAULT '',
    "action" TEXT NOT NULL DEFAULT '',
    "lighting" TEXT NOT NULL DEFAULT '',
    "artDirection" TEXT NOT NULL DEFAULT '',
    "extras" TEXT NOT NULL DEFAULT '',
    "aspectRatio" TEXT NOT NULL DEFAULT '16:9',
    "stylize" INTEGER NOT NULL DEFAULT 700,
    "chaos" INTEGER NOT NULL DEFAULT 0,
    "raw" BOOLEAN NOT NULL DEFAULT false,
    "styleWeight" INTEGER,
    "seed" TEXT,
    "stripQueryStrings" BOOLEAN NOT NULL DEFAULT true,
    "styleRefs" TEXT NOT NULL DEFAULT '[]',
    "profileIds" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Preset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT '',
    "setting" TEXT NOT NULL DEFAULT '',
    "action" TEXT NOT NULL DEFAULT '',
    "lighting" TEXT NOT NULL DEFAULT '',
    "artDirection" TEXT NOT NULL DEFAULT '',
    "extras" TEXT NOT NULL DEFAULT '',
    "aspectRatio" TEXT NOT NULL DEFAULT '16:9',
    "stylize" INTEGER NOT NULL DEFAULT 700,
    "chaos" INTEGER NOT NULL DEFAULT 0,
    "raw" BOOLEAN NOT NULL DEFAULT false,
    "styleWeight" INTEGER,
    "seed" TEXT,
    "stripQueryStrings" BOOLEAN NOT NULL DEFAULT true,
    "styleRefs" TEXT NOT NULL DEFAULT '[]',
    "profileIds" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
