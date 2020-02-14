# Image information
export APPNAME ?= $(shell basename `git rev-parse --show-toplevel`)
export BRANCH ?= $(shell git branch | sed -n 's/^\* //p')
export COMMIT ?= $(shell git rev-parse HEAD)
export COMMIT_DATE ?= $(shell TZ="America/Santiago" git show --quiet --date='format-local:%d-%m-%Y_%H:%M:%S' --format="%cd")
export COMMIT_DATE_UTC ?= $(shell TZ=UTC git show --quiet --date='format-local:%Y%m%d_%H%M%S' --format="%cd")
export CREATION_DATE ?= $(shell date -u '+%Y%m%d_%H%M%S')
export CREATOR ?= $(shell git log --format=format:%ae | head -n 1)

# Docker environment
export DOCKER_REGISTRY ?= containers.mpi-internal.com
export DOCKER_IMAGE ?= ${DOCKER_REGISTRY}/yapo/${APPNAME}
export DOCKER_TAG ?= $(shell echo ${BRANCH} | tr '[:upper:]' '[:lower:]' | sed 's,/,_,g')
export DOCKER ?= docker

# K8s environment
export CHART_DIR ?= k8s/${APPNAME}

build:
	start-docker-daemon
	${DOCKER} build \
    -t ${DOCKER_IMAGE}:${DOCKER_TAG} \
    -f dockerfile \
	--build-arg ARTIFACTORY_NPM_SECRET=${ARTIFACTORY_NPM_SECRET} \
	--build-arg ARTIFACTORY_USER=${ARTIFACTORY_USER} \
    --label appname=${APPNAME} \
    --label branch=${BRANCH} \
    --label build-date=${CREATION_DATE} \
    --label commit=${COMMIT} \
    --label commit-author=${CREATOR} \
    --label commit-date=${COMMIT_DATE} \
    .
	${DOCKER} tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:${COMMIT_DATE_UTC}

docker-publish:
	${DOCKER} login --username "${ARTIFACTORY_USER}" --password "${ARTIFACTORY_PWD}" "${DOCKER_REGISTRY}"
	${DOCKER} push "${DOCKER_IMAGE}:${DOCKER_TAG}"
	${DOCKER} push "${DOCKER_IMAGE}:${COMMIT_DATE_UTC}"

helm-publish:
	helm lint ${CHART_DIR}
	helm package ${CHART_DIR}
	jfrog rt u "*.tgz" "helm-local/yapo/" || true

.PHONY: build
