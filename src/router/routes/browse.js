import { createRouter } from "vue-router"

export default [{
    path: 'browse',
    component: () => import('~/views/browse/Browse.vue'),
    children: [
        {
            name: 'stresstype',
            path: 'stresstype',
            component: () => import('~/views/browse/browse-detail/StressType.vue'),
            children: [
                {
                    name: 'stresstypelist',
                    path:'',
                    component: () => import('~/views/browse/browse-detail/browse-detail-item/StreeTypeList.vue')
                },
                {
                    name: 'streetypelistdetail',
                    path: 'list',
                    component: () => import('~/views/browse/browse-detail/browse-detail-item/StressTypeListItem.vue')
                },
                {
                    name: 'geneoverview',
                    path: 'geneoverview',
                    component: () => import('~/views/browse/browse-detail/browse-detail-item/GeneOverview.vue')
                },
                {
                    name: 'proteinoverview',
                    path: 'proteinoverview',
                    component: () => import('~/views/browse/browse-detail/browse-detail-item/ProteinOverview.vue')
                }
            ]
        },
        {
            name: 'expressionorgans',
            path: 'expressionorgans',
            component: () => import('~/views/browse/browse-detail/ExpressionOrgans.vue')
        },
        {
            name: 'genefamily',
            path: 'genefamily',
            component: () => import('~/views/browse/browse-detail/GeneFamily.vue'),
            children: [
                {
                    name: 'genefamilydetail',
                    path: '',
                    component: () => import('~/views/browse/browse-detail/browse-detail-item/GeneFamily.vue')
                },
                {
                    name: 'genefamilymyb',
                    path: 'myb',
                    component: () => import('~/views/browse/browse-detail/browse-detail-item/GeneFamilyMYB.vue')
                },
            ]
        },
        {
            name: 'phenotypeinfluenced',
            path: 'phenotypeinfluenced',
            component: () => import('~/views/browse/browse-detail/PhenotypeInfluenced.vue')
        },
        {
            name: 'species',
            path: 'species',
            component: () => import('~/views/browse/browse-detail/Species.vue')
        },
        {
            name: 'subcellularlocalization',
            path: 'subcellularlocalization',
            component: () => import('~/views/browse/browse-detail/SubcellularLocalization.vue')
        }
    ]
}]
